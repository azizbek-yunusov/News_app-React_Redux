// import { useCallback } from 'react';
// useCallback ishlatilimaydi chunli CreactAsyncThunk ishlatilgani uchun
export const useHttp = () => {
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-type": "application/json" }
  ) => {
    try {
      const response = await fetch(url, { method, body, headers });
      if (!response.ok) {
        throw new Error(`Cloud not fetch ${url}, status ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  return { request };
};

// import { useCallback } from 'react';

// export const useHttp = () => {
//   const request = useCallback(async (
//     url,
//     method = "GET",
//     body = null,
//     headers = { "Content-type": "application/json" }) => {
//     try {
//       const response = await fetch(url, { method, body, headers })
//       if (!response.ok) {
//         throw new Error(`Cloud not fetch ${url}, status ${response.status}`)
//       }
//       const data = await response.json();
//       return data;
//     }
//     catch (e) {
//       console.log(e);
//     }
//   }, [])
//   return { request }
// }
