import { ChangeEvent, useEffect, useState, useContext } from "react";
import { Input, Select, Option } from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Datepicker, DateValueType } from "react-custom-datepicker-tailwind";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import moment from "moment";

//Components
import Available from "./Availability/Available";
import Unavailable from "./Availability/Unavailable";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_ALL_PRODUCT, GET_POSTAL_CODE, GET_UNAVAILABLE_DATE, GET_FRANCHISEE_DETAILS, GET_SET_UP_TIMES, GET_REMOVAL_TIMES } from "@/Query/Function/Product/product.function";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Interface
export interface Inputs {
    event: string;
    option: string;
    date: DateValueType;
    rental: string;
    postalCode: string;
    setUpTime: string;
    removalTime: string;
}

const Availability = () => {
    //State
    const [availability, setAvailability] = useState<null | boolean>(null);
    const [setUpDisabled, setSetupDisabled] = useState<string[]>([]);
    const [removalDisabled, setRemovalDisabled] = useState<string[]>([]);

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
    const postalCode = watch().postalCode;
    const date = watch().date;
    const rental = watch().rental;
    const returnDate = moment(date?.endDate).add(rental, "days").format("YYYY-MM-DD")

    //Query
    const postalData = useQuery({ queryKey: ["postalArea", postalCode], queryFn: () => GET_POSTAL_CODE(postalCode), enabled: !!postalCode, refetchOnWindowFocus: false });
    const unavailableData = useQuery({ queryKey: ["unavailability", postalData.data?.[0]?.["Reference to Admin - User Property"]], queryFn: () => GET_UNAVAILABLE_DATE(postalData.data?.[0]?.["Reference to Admin - User Property"] as string), enabled: false, refetchOnWindowFocus: false });
    const franchiseeData = useQuery({ queryKey: ["franchiseeData", postalData.data?.[0]?.["Reference to Admin - User Property"]], queryFn: () => GET_FRANCHISEE_DETAILS(postalData.data?.[0]?.["Reference to Admin - User Property"] as string), enabled: false, refetchOnWindowFocus: false });
    const setUptimes = useQuery({ queryKey: ["setUpTimes", date, postalData.data?.[0]?.["Reference to Admin - User Property"]], queryFn: () => GET_SET_UP_TIMES(date?.endDate?.toString() as string, postalData.data?.[0]?.["Reference to Admin - User Property"] as string), enabled: false, refetchOnWindowFocus: false });
    const removalTimes = useQuery({ queryKey: ["removalTimes", returnDate, postalData.data?.[0]?.["Reference to Admin - User Property"]], queryFn: () => GET_REMOVAL_TIMES(returnDate, postalData.data?.[0]?.["Reference to Admin - User Property"] as string), enabled: false, refetchOnWindowFocus: false });


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
            const nextStepElement = document.getElementById("timeline-container");
            if (nextStepElement) {
                nextStepElement.scrollIntoView({ block: "start" });
            }
        } else {
            setAvailability(true)
            const nextStepElement = document.getElementById("timeline-container");
            if (nextStepElement) {
                nextStepElement.scrollIntoView({ block: "start" });
            }
            setAvailableData?.({
                formData: value,
                franchiseeId: postalData.data?.[0]?.["Reference to Admin - User Property"],
                franchiseeName: franchiseeData.data[0]["Public Name"],
                surcharge: postalData.data?.[0]?.Surcharge,
                details: franchiseeData.data[0]
            })
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

    //Get Times Handler
    const getInitialTimes = () => {
        const times = [];
        const format = "HH:mm";
        const start = moment("00:00", format);
        const end = moment("23:30", format);
        while (start <= end) {
            times.push(start.format(format));
            start.add(30, 'minutes');
        }
        return times;
    }
    const getFilteredTime = () => {
        const times = [];
        const format = "HH:mm";
        const start = moment(franchiseeData.data?.[0]["Available for Installations From"], format);
        const end = moment(franchiseeData.data?.[0]["Available Till"], format);
        while (start <= end) {
            times.push(start.format(format));
            start.add(30, 'minutes');
        }
        return times;
    }

    //Lifecycle Hook
    useEffect(() => {
        if (postalCode) {
            trigger("postalCode")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postalCode])

    useEffect(() => {
        if (postalData.data && postalData.data?.length > 0) {
            unavailableData.refetch()
            franchiseeData.refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postalData.data])

    useEffect(() => {
        if (postalData.data && postalData.data?.length > 0 && date) {
            setUptimes.refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    useEffect(() => {
        if (postalData.data && postalData.data?.length > 0 && date && rental) {
            removalTimes.refetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rental, date])

    useEffect(() => {
        if (setUptimes.data) {
            const times = setUptimes?.data.map((item) => {
                const rentalTime = moment(item["Rental Date"]);
                const returnTime = moment(item["Return Date"]);
                const selectedDate = moment(date?.endDate);
                let start, end;
                if (rentalTime.isSame(selectedDate, "date")) {
                    start = rentalTime.format("HH:mm");
                    end = rentalTime.clone().add(franchiseeData.data?.[0]["Allow Hours Between Installations"], 'hours').format('HH:mm');
                }
                if (returnTime.isSame(selectedDate, 'date')) {
                    start = returnTime.clone().subtract(franchiseeData.data?.[0]["Allow Hours Between Installations"], 'hours').format('HH:mm');
                    end = returnTime.format("HH:mm");
                }
                return {
                    start: start,
                    end: end
                };
            });
            const result: string[] = [];
            times.forEach(({ start, end }) => {
                let current = moment(start, 'HH:mm');

                while (current.isSameOrBefore(moment(end, 'HH:mm'))) {
                    result.push(current.format('HH:mm'));
                    current.add(30, 'minutes');
                }
            });

            setSetupDisabled(result)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setUptimes.data])

    useEffect(() => {
        if (removalTimes.data) {
            const times = removalTimes?.data.map((item) => {
                const rentalTime = moment(item["Rental Date"]);
                const returnTime = moment(item["Return Date"]);
                const selectedDate = moment(returnDate);
                let start, end;
                if (rentalTime.isSame(selectedDate, "date")) {
                    start = rentalTime.format("HH:mm");
                    end = rentalTime.clone().add(franchiseeData.data?.[0]["Allow Hours Between Installations"], 'hours').format('HH:mm');
                }
                if (returnTime.isSame(selectedDate, 'date')) {
                    start = returnTime.clone().subtract(franchiseeData.data?.[0]["Allow Hours Between Installations"], 'hours').format('HH:mm');
                    end = returnTime.format("HH:mm");
                }
                return {
                    start: start,
                    end: end
                };
            });
            const result: string[] = [];
            times.forEach(({ start, end }) => {
                let current = moment(start, 'HH:mm');

                while (current.isSameOrBefore(moment(end, 'HH:mm'))) {
                    result.push(current.format('HH:mm'));
                    current.add(30, 'minutes');
                }
            });
            setRemovalDisabled(result)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [removalTimes.data])

    return (
        <>
            {availability === null &&
                <div className="mt-16 sm:mt-16 xxs:mt-5 bg-white shadow-3xl py-12 msm:py-12 xxs:py-5 px-8 msm:px-8 xxs:px-5 rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4 lg:col-span-4 md:col-span-6 xxs:col-span-12">
                                <Controller
                                    control={control}
                                    name="event"
                                    rules={{ required: "Event is required field!" }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            label="Event type"
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
                            <div className="col-span-4 lg:col-span-4 md:col-span-6 xxs:col-span-12">
                                <Controller
                                    control={control}
                                    name="option"
                                    rules={{ required: "Option is required field!" }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            label="When is your event?"
                                            value={value}
                                            color="cyan"
                                            onChange={(e) => onChange(e as string)}
                                            error={errors.option ? true : false}
                                        >
                                            <Option value="mid-week">Mid-week</Option>
                                            <Option value="weekend">Weekend</Option>
                                            <Option value="bank-holiday">Bank Holiday</Option>
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
                            <div className="col-span-4 lg:col-span-4 md:col-span-6 xxs:col-span-12">
                                <div>
                                    <Input
                                        label="Delivery & installation postcode"
                                        crossOrigin="anonymous"
                                        color="cyan"
                                        onInput={handleInput}
                                        {...register("postalCode", {
                                            required: "Postal code is required!",
                                            pattern: {
                                                value: /^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/,
                                                message: "Invalid UK postcode. Please enter a postcode in the format 'AA9A 9AA', 'A9 9AA', 'A9A 9AA', 'A99 9AA', or 'AA99 9AA'."
                                            }
                                        })}
                                        error={errors.postalCode ? true : false} />
                                </div>
                                {errors.postalCode &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_5%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.postalCode?.message}</span>
                                    </p>
                                }
                            </div>
                            <div className="col-span-3 lg-max:col-span-3 lg:col-span-4 md:col-span-6 xxs:col-span-12">
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
                                                    label="Rental date(s)"
                                                    color="cyan"
                                                    error={errors.date ? true : false}
                                                    icon={<Icon icon="uis:calender" />} crossOrigin={undefined} />
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
                            <div className="col-span-3 lg-max:col-span-3 lg:col-span-4 md:col-span-6 xxs:col-span-12">
                                <Controller
                                    control={control}
                                    name="rental"
                                    rules={{ required: "Rental is required field!" }}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            label="How many days?"
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
                            <div className="col-span-3 lg-max:col-span-3 lg:col-span-4 md:col-span-6 xxs:col-span-12">
                                <Controller
                                    control={control}
                                    name="setUpTime"
                                    rules={{ required: "Set-up time is required field!" }}
                                    render={({ field: { onChange, value } }) => {
                                        if (!franchiseeData.data || franchiseeData.data.length === 0 || !franchiseeData.data[0]["Allow Hours Between Installations"] || !franchiseeData.data[0]["Available Till"]) return (
                                            <Select
                                                label="Set-up time"
                                                color="cyan"
                                                key="emptyStartTime"
                                                onChange={(e) => onChange(e as string)}
                                                error={errors.setUpTime ? true : false}
                                            >
                                                {getInitialTimes().map((item, i) => (
                                                    <Option value={item} disabled={setUpDisabled.includes(item)} key={i}>{item}</Option>
                                                ))}
                                            </Select>
                                        )
                                        return (
                                            <Select
                                                label="Set-up time"
                                                color="cyan"
                                                key="notEmptyStartTime"
                                                value={value}
                                                onChange={(e) => onChange(e as string)}
                                                error={errors.setUpTime ? true : false}
                                            >
                                                {getFilteredTime().map((item, i) => (
                                                    <Option value={item} disabled={setUpDisabled.includes(item)} key={i}>{item}</Option>
                                                ))}
                                            </Select>
                                        )
                                    }}
                                />
                                {errors.setUpTime &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_10%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.setUpTime?.message}</span>
                                    </p>
                                }
                            </div>
                            <div className="col-span-3 lg-max:col-span-3 lg:col-span-4 md:col-span-6 xxs:col-span-12">
                                <Controller
                                    control={control}
                                    name="removalTime"
                                    rules={{ required: "Removal time is required field!" }}
                                    render={({ field: { onChange, value } }) => {
                                        if (!franchiseeData.data || franchiseeData.data.length === 0 || !franchiseeData.data[0]["Allow Hours Between Installations"] || !franchiseeData.data[0]["Available Till"]) return (
                                            <Select
                                                label="Removal time"
                                                color="cyan"
                                                key="emptyStartTime"
                                                onChange={(e) => onChange(e as string)}
                                                error={errors.removalTime ? true : false}
                                            >
                                                {getInitialTimes().map((item, i) => (
                                                    <Option value={item} key={i} disabled={removalDisabled.includes(item)}>{item}</Option>
                                                ))}
                                            </Select>
                                        )
                                        return (
                                            <Select
                                                label="Removal time"
                                                color="cyan"
                                                key="notEmptyStartTime"
                                                value={value}
                                                onChange={(e) => onChange(e as string)}
                                                error={errors.removalTime ? true : false}
                                            >
                                                {getFilteredTime().map((item, i) => (
                                                    <Option value={item} disabled={removalDisabled.includes(item)} key={i}>{item}</Option>
                                                ))}
                                            </Select>
                                        )
                                    }}
                                />
                                {errors.removalTime &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_10%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.removalTime?.message}</span>
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="text-center mt-14 msm:mt-13 xxs:mt-6">
                            <button className="bg-c-deep-sky text-white py-2 px-7 font-medium text-base rounded-lg relative" type="submit" disabled={postalData.isFetching || unavailableData.isFetching || franchiseeData.isFetching || setUptimes.isFetching || removalTimes.isFetching}>
                                <span className={`${(postalData.isFetching || unavailableData.isFetching || franchiseeData.isFetching || setUptimes.isFetching || removalTimes.isFetching) ? "opacity-30" : "opacity-100"}`}>CHECK AVAILABILITY</span>
                                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                                    {(postalData.isFetching || unavailableData.isFetching || franchiseeData.isFetching || setUptimes.isFetching || removalTimes.isFetching) &&
                                        <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            }
            {availability === true &&
                <Available
                    date={getValues("date")?.endDate as Date}
                    name={franchiseeData?.data?.[0]?.["Public Name"] as string}
                    setAvailability={setAvailability}
                />
            }
            {availability === false &&
                <Unavailable
                    setAvailability={setAvailability}
                />
            }
        </>
    );
};

export default Availability;


const array = [
    {
        "Rental Date": "2023-08-13T16:00:00+01:00",
        "Return Date": "2023-08-14T16:00:00+01:00",
    },
    {
        "Rental Date": "2023-08-13T16:00:00+01:00",
        "Return Date": "2023-08-13T16:00:00+01:00",
    }
]