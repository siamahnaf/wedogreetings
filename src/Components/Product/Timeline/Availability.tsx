import { ChangeEvent, useEffect, useState, useContext } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";
import { Datepicker, DateValueType } from "react-custom-datepicker-tailwind";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

//Components
import Available from "./Availability/Available";
import Unavailable from "./Availability/Unavailable";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_ALL_PRODUCT, GET_POSTAL_CODE, GET_UNAVAILABLE_DATE, GET_FRANCHISEE_DETAILS } from "@/Query/Function/Product/product.function";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Interface
export interface Inputs {
    event: string;
    option: string;
    date: DateValueType;
    rental: string;
    postalCode: string;
}

const Availability = () => {
    //State
    const [availability, setAvailability] = useState<null | boolean>(null);

    //Hook Initializing
    const router = useRouter();

    //Context
    const { setAvailableData } = useContext(TimelineContext);

    //Query
    const { data } = useQuery({ queryKey: ["allProduct"], queryFn: GET_ALL_PRODUCT });

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        trigger,
        watch,
        getValues,
        setError
    } = useForm<Inputs>({
        defaultValues: {
            event: data?.find((item) => item["@row.id"] === Number(router.query.id))?.["@row.id"].toString()
        }
    });

    //Form Data
    const postalCode = watch().postalCode

    //Query
    const postalData = useQuery({ queryKey: ["postalArea", postalCode], queryFn: () => GET_POSTAL_CODE(postalCode), enabled: false });
    const unavailableData = useQuery({ queryKey: ["unavailability", postalData.data?.[0]?.Franchisee], queryFn: () => GET_UNAVAILABLE_DATE(postalData.data?.[0]?.Franchisee as string), enabled: false });
    const franchiseeData = useQuery({ queryKey: ["franchiseeData", postalData.data?.[0]?.Franchisee], queryFn: () => GET_FRANCHISEE_DETAILS(postalData.data?.[0]?.Franchisee as string), enabled: false });

    //Form Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const selectedDate = new Date(value.date?.endDate as Date);
        const isDateUnavailable = unavailableData.data?.some((item) => {
            const startDate = new Date(item.From);
            const endDate = new Date(item.To);
            return selectedDate >= startDate && selectedDate <= endDate;
        });
        if (isDateUnavailable) {
            setError("date", {
                type: "unavailable",
                message: "Selected date is unavailable.",
            });
            return;
        }
        if (!postalData.data || franchiseeData.data?.[0]?.Status !== "Active") {
            setAvailability(false)
        } else {
            setAvailability(true)
            setAvailableData?.({ formData: value, franchiseeId: postalData.data?.[0]?.Franchisee })
        }
    }

    //Postal Code Formatter
    const formatPostalCode = (value: string): string => {
        let inputValue = value;
        inputValue = inputValue.toUpperCase();
        inputValue = inputValue.replace(/[^A-Z0-9\s]/g, '');
        return inputValue;
    };
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const formattedValue = formatPostalCode(inputValue);
        event.target.value = formattedValue;
    };

    //Lifecycle Hook
    useEffect(() => {
        postalData.refetch()
        if (postalCode) {
            trigger("postalCode")
        }
    }, [postalCode])

    useEffect(() => {
        if (postalData.data && postalData.data?.length > 0) {
            unavailableData.refetch()
            franchiseeData.refetch()
        }
    }, [postalData])

    return (
        <>
            {availability === null &&
                <div className="mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <Controller
                                    control={control}
                                    name="event"
                                    rules={{ required: "Event is required field!" }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            label="Event"
                                            value={value}
                                            color="cyan"
                                            onChange={(e) => onChange(e as string)}
                                            error={errors.event ? true : false}
                                        >
                                            {data?.map((item, i) => (
                                                <Option key={i} value={item["@row.id"].toString()}>{item["Product Name"]}</Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.event &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_5%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.event?.message}</span>
                                    </p>
                                }
                            </div>
                            <div>
                                <Controller
                                    control={control}
                                    name="option"
                                    rules={{ required: "Option is required field!" }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            label="Options"
                                            value={value}
                                            color="cyan"
                                            onChange={(e) => onChange(e as string)}
                                            error={errors.option ? true : false}
                                        >
                                            <Option value="mid-week">Mid-week</Option>
                                            <Option value="weekend">Weekend</Option>
                                            <Option value="public-holiday">Public Holiday</Option>
                                        </Select>
                                    )}
                                />
                                {errors.option &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_5%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.option?.message}</span>
                                    </p>
                                }
                            </div>
                            <div>
                                <div>
                                    <Input
                                        label="Postal Code"
                                        color="cyan"
                                        onInput={handleInput}
                                        {...register("postalCode", {
                                            required: "Postal code is required!",
                                            pattern: {
                                                value: /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/,
                                                message: "Invalid UK postcode. Please enter a postcode in the format 'AA9A 9AA', 'A9 9AA', 'A9A 9AA', 'A99 9AA', or 'AA99 9AA'."
                                            }
                                        })}
                                        error={errors.postalCode ? true : false}
                                    />
                                </div>
                                {errors.postalCode &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_5%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.postalCode?.message}</span>
                                    </p>
                                }
                            </div>
                            <div>
                                <Controller
                                    control={control}
                                    name="rental"
                                    rules={{ required: "Rental is required field!" }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            label="Rental"
                                            value={value}
                                            color="cyan"
                                            onChange={(e) => onChange(e as string)}
                                            error={errors.rental ? true : false}
                                        >
                                            {Array.from({ length: 20 }, (_, index) => (
                                                <Option key={index + 1} value={String(index + 1)}>
                                                    {index + 1}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.rental &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_5%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.rental?.message}</span>
                                    </p>
                                }
                            </div>
                            <div>
                                <Controller
                                    control={control}
                                    name="date"
                                    rules={{ required: "Date is required field!" }}
                                    render={({ field: { onChange, value } }) => (
                                        <Datepicker
                                            useRange={false}
                                            asSingle={true}
                                            value={value}
                                            onChange={onChange}
                                            primaryColor="cyan"
                                            minDate={new Date()}
                                            disabledDates={unavailableData.data?.map((item) => ({ startDate: new Date(item.From), endDate: new Date(item.To) }))}
                                            customInput={
                                                <Input
                                                    label="Date"
                                                    color="cyan"
                                                    error={errors.date ? true : false}
                                                    icon={<Icon icon="uis:calender" />}
                                                />
                                            }
                                        />
                                    )}
                                />
                                {errors.date &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_5%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.date?.message}</span>
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="text-center mt-14">
                            <button className="bg-c-deep-sky text-white py-2 px-7 font-medium text-base rounded-lg" type="submit">
                                CHECK AVAILABILITY
                            </button>
                        </div>
                    </form>
                </div>

            }
            {availability === true &&
                <Available
                    date={getValues("date")?.endDate as Date}
                    firstName={franchiseeData.data?.[0]?.["First Name"] as string}
                    lastName={franchiseeData.data?.[0]["Last Name"] as string}
                    setAvailability={setAvailability}
                />
            }
            {availability === false &&
                <Unavailable
                    setAvailability={setAvailability}
                />
            }
            {/* {JSON.stringify(postalData.data)}
            {JSON.stringify(unavailableData.data)}
            {JSON.stringify(franchiseeData.data)} */}
        </>
    );
};

export default Availability;