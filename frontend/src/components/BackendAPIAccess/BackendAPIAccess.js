export default {
  getSchools,
  getSchoolsSorted,
  getSingleSchool
}

const COUNT = 10

/*****************************************
              Helper Functions
*****************************************/

function createHeaders() {
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  return header
}

function fetch_jsend(url, payload) {
  return fetch(url, payload)
    .then((response) => {
      if (response.status == 200 && response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function getSchools(page) {
  const payload = {
    method: 'GET',
    headers: createHeaders(),
  }

  if (!page) {
    page = 1
  }

  var queryString = "?count=" + COUNT + "&page=" + page
  return fetch_jsend("/api/schools" + queryString, payload)
}

function getSchoolsSorted(keyword, sort_type, page) {
  const payload = {
    method: 'GET',
    headers: createHeaders(),
  }

  var sortParam = "sortType=desc"

  if (sort_type == "asc") {
    sortParam = "sortType=asc"
  }

  if (!page) {
    page = 1
  }

  var queryString = "?sort=" + keyword + "&count=" + COUNT + "&page=" + page + "&" + sortParam

  return fetch_jsend("/api/schools" + queryString, payload)
}

function getSingleSchool(schoolId) {
  const payload = {
    method: 'GET',
    headers: createHeaders(),
  }
  
  return fetch_jsend("/api/schools/" + schoolId, payload)
}