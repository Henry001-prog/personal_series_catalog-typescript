import { rest } from "msw";
import { seriesApi } from "../services/api";

const { api } = seriesApi;

const series = [
  {
    series: {
      _id: "63538dc4f75c1ea8af9fe6c2",
      title: "Breaking Bad",
      img: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTE",
      gender: "Drama",
      description:
        "O professor de química Walter White não acredita que sua vida possa piorar ainda mais. Quando descobre que tem câncer terminal, Walter decide arriscar tudo para ganhar dinheiro enquanto pode, transformando sua van em um laboratório de metanfetamina.",
      rate: 80,
    },
    _id: "63538dc4f75c1ea8af9fe6c1",
    uid: "c731d83ed51e2719269ab8228b52ccc6",
    __v: 0,
  },
  {
    series: {
      title: "How I Met Your Mother",
      img: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST",
      gender: "Comédia",
      rate: 80,
      description: "Muito boa",
      _id: "63539129f75c1ea8af9fe6e6",
    },
    _id: "63539129f75c1ea8af9fe6e5",
    uid: "c731d83ed51e2719269ab8228b52ccc6",
    __v: 0,
  },
];
const uid = "c731d83ed51e2719269ab8228b52ccc6";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRhNTVmNTA2MzMzOWZiMzBiZGQ3NGQiLCJ1aWQiOiJjNzMxZDgzZWQ1MWUyNzE5MjY5YWI4MjI4YjUyY2NjNiIsImVtYWlsIjoidGVzdHVpZDFAbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ1Nk1iUFJRT0xMcXBqNFNwblNyUnFPYml0MDgvcFpILllPZzJtNC9YYjIzcVBNSkhmUjhqRyIsInRva2VuIjoiIiwiX192IjowLCJpYXQiOjE2NjY5OTE3MDgsImV4cCI6MTY2NzQyMzcwOH0.V364zyjKHXMTbOgJIvLTWyXG4pmGJ_J_PgZLivZ7CjQ";

export const handlers = [
  rest.get('http://192.168.0.108:3002/api/series/:uid', (req, res, ctx) => {
    // const series = req.url.searchParams.get("token");
    console.log('This line is run');
    return res(
      ctx.status(200),
      ctx.json([
        {
          series: {
            _id: "63538dc4f75c1ea8af9fe6c2",
            title: "Breaking Bad94",
            img: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTE",
            gender: "Drama",
            description:
              "O professor de química Walter White não acredita que sua vida possa piorar ainda mais. Quando descobre que tem câncer terminal, Walter decide arriscar tudo para ganhar dinheiro enquanto pode, transformando sua van em um laboratório de metanfetamina.",
            rate: 80,
          },
          _id: "63538dc4f75c1ea8af9fe6c1",
          uid: "c731d83ed51e2719269ab8228b52ccc6",
        },
      ])
    );
  }),
];
