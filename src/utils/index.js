import axios from "axios";
const URL =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

export async function getProducts() {
  return axios({
    method: "get",
    url: URL,
  }).then(function (response) {
    return response.data;
  });
}

//search implementation function

export function searchHelper(input, list) {
  input = input.toLowerCase();
  let resultArray = [];
  list.map((element) => {
    let res = element.name.toLowerCase();
    if (res.includes(input)) {
      resultArray.push(element);
    }
  });

  return resultArray;
}

export function search(input, data) {
  const queries = input.split(" "); //convert string to array of keywords
  queries.map((elem) => {
    let temp = searchHelper(elem, data);
    data = temp;
  });
  return data;
}

// filter utitlity functions

export function filterByQuery(filterArray, list) {
  // console.log(filterArray, list);
  //individual arrays to check which filter are selected
  let ColorArray = [];
  let GenderArray = [];
  let TypeArray = [];
  let PriceArray = [];

  //pushing the filters in separate arrays
  for (let i = 0; i < filterArray.length; i++) {
    let filter = filterList[filterArray[i] - 1];
    switch (filter.type) {
      case "color": {
        ColorArray.push(filter);
        break;
      }

      case "gender": {
        GenderArray.push(filter);
        break;
      }

      case "price": {
        PriceArray.push(filter);
        break;
      }

      case "type": {
        TypeArray.push(filter);
        break;
      }

      default: {
        break;
      }
    }
  }

  let OutputArray = [];

  //filtering

  if (ColorArray.length !== 0) {
    OutputArray = filterByColor(ColorArray, list);
  }
  if (GenderArray.length !== 0) {
    if (OutputArray.length !== 0) {
      OutputArray = filterByGender(GenderArray, OutputArray);
    } else {
      OutputArray = filterByGender(GenderArray, list);
    }
  }
  if (PriceArray.length !== 0) {
    if (OutputArray.length !== 0) {
      OutputArray = filterByPrice(PriceArray, OutputArray);
    } else {
      OutputArray = filterByPrice(PriceArray, list);
    }
  }
  if (TypeArray.length !== 0) {
    if (OutputArray.length !== 0) {
      OutputArray = filterByType(TypeArray, OutputArray);
    } else {
      OutputArray = filterByType(TypeArray, list);
    }
  }
  return OutputArray;
}

const filterByColor = (filters, list) => {
  let filterList = [];
  for (let i = 0; i < list.length; i++) {
    for (let k = 0; k < filters.length; k++) {
      if (list[i].color === filters[k].value) {
        filterList.push(list[i]);
      }
    }
  }
  return filterList;
};

const filterByGender = (filters, list) => {
  let filterList = [];
  for (let i = 0; i < list.length; i++) {
    for (let k = 0; k < filters.length; k++) {
      if (list[i].gender === filters[k].value) {
        filterList.push(list[i]);
      }
    }
  }
  return filterList;
};

const filterByPrice = (filters, list) => {
  let filterList = [];
  for (let i = 0; i < list.length; i++) {
    for (let k = 0; k < filters.length; k++) {
      if (
        list[i].price <= filters[k].value.upper &&
        list[i].price >= filters[k].value.lower
      ) {
        filterList.push(list[i]);
      }
    }
  }
  return filterList;
};

const filterByType = (filters, list) => {
  let filterList = [];
  for (let i = 0; i < list.length; i++) {
    for (let k = 0; k < filters.length; k++) {
      if (list[i].type === filters[k].value) {
        filterList.push(list[i]);
      }
    }
  }
  return filterList;
};

export const filterList = [
  {
    id: 1,
    type: "color",
    value: "Red",
  },
  {
    id: 2,
    type: "color",
    value: "Blue",
  },
  {
    id: 3,
    value: "Green",
    type: "color",
  },

  {
    id: 4,
    type: "gender",
    value: "Men",
  },
  {
    id: 5,
    type: "gender",
    value: "Women",
  },

  {
    id: 6,
    type: "price",
    value: { lower: 0, upper: 250 },
  },
  {
    id: 7,
    type: "price",
    value: { lower: 251, upper: 450 },
  },
  {
    id: 8,
    type: "price",
    value: { lower: 451, upper: Number.MAX_VALUE },
  },
  {
    id: 9,
    type: "type",
    value: "Polo",
  },
  {
    id: 10,
    type: "type",
    value: "Hoodie",
  },
  {
    id: 11,
    type: "type",
    value: "Basic",
  },
];
