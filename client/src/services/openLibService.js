import httpService from "./httpService";

httpService.delJwt();

async function getBooksByName(searchQuery) {
  try {
    const { data } = await httpService.get(
      `http://openlibrary.org/search.json?title=${searchQuery}&fields=key,title,first_publish_year,author_name,subject,cover_edition_key&limit=6`
    );
    return data;
  } catch (err) {
    return err.response.data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getBooksByName };
