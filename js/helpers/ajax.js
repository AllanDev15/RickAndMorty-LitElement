export default async function (url) {
  try {
    const response = await fetch(url);
    let data;

    response.ok ? (data = await response.json()) : Promise.reject(response);

    return data;
  } catch (error) {
    console.log(error);
  }
}
