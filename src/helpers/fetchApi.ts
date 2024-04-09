import { type APIResponseDTO } from "@/types/api-response.type";

interface IProps {
  pageParam: number;
  text: string;
}

export default function fetchApi({ pageParam, text }: IProps) {
  if (text) {
    return fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageParam}&name=${text}`,
    ).then(async (res) => {
      return res.json();
    });
  } else {
    return {
      results: [],
      info: {
        pages: 0,
        count: 0,
      },
    } as APIResponseDTO;
  }
}
