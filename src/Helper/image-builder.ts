export const imageUrl = (rowId: number, image: string, columId: number) => {
    const guid = image?.split(";")[2];
    const ext = image?.split(";")[0].split(".")[1]
    const url = `https://wdg.teamdesk.net/secure/db/90582/attachment.aspx?fid=${columId}&id=${rowId}&guid=${guid}&ext=.${ext}`;
    return url;
}