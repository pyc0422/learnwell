export const getFormInput = (form:Record<string, any>, name:string) => {
  return (form.elements.namedItem(name) as HTMLInputElement).value
}

export const getCookies = (name:string) => {
  return document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1];
}

export const validateURL = (url: FormDataEntryValue) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})' + // domain name and IP
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$','i' // fragment locator
  );
  return !!pattern.test(url.toString());
};
export const isYT = (url:string) => {
  return !url.match('youtu') ? false : true
}
export const getYTId = (url:string) => {
  const urlArr = url.split('/');
  const idStr = urlArr[urlArr.length - 1];
  const idArr = idStr.split('=');
  return idArr[idArr.length - 1];
}


export const embedUrl = (url:string) => {
  return isYT(url) ?
  `https://www.youtube.com/embed/${getYTId(url)}`
  : url
}