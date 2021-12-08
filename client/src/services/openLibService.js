import httpService from "./httpService";

async function getBooksByName(searchQuery) {
  httpService.delJwt();

  try {
    const { data } = await httpService.get(
      `https://openlibrary.org/search.json?title=${searchQuery}&fields=key,title,first_publish_year,author_name,subject,cover_edition_key&limit=12`
    );
    return data;
  } catch (err) {
    return err.response.data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getBooksByName };
