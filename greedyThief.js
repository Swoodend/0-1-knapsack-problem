function greedyThief(items, W){
  let stolenItems = [];
  let newItems = items.slice();
  newItems.unshift({});
  
  //make a default value table
  let dt = getDefaultValueTable(items.length, W);
  
  //fill in the default table with correct values to make decisions on
  //also grab the info for the largest value in table
  let [vt, largestValInfo] = completeValueTable(dt, items);
  let { i } = largestValInfo;
  
  //cant mutate any state?
  let w = W;
  
  while(i > 0 && w > 0){

    if(vt[i][w] !== vt[i-1][w]){
      stolenItems.push(newItems[i]);
      w = w - newItems[i].weight;
      i--;
    } else {
      i--;
    }
  }
  
  return stolenItems;
}

function completeValueTable(table, items){
  //requirements state you cant mutate the items array.
  //adding an extra item to  start of array to make indexing easier
  let newItems = items.slice();
  newItems.unshift({});
  let largestValue = {i: 1, val: 0};
  for(let i = 1; i < newItems.length; i++){
    for(let w = 1; w <= W; w++){
      if (newItems[i].weight > w){
        table[i][w] = table[i-1][w];
        if (table[i-1][w] > largestValue.val){
          largestValue.val = table[i-1][w];
          largestvalue.i = i;
        }
      } else {
        if (newItems[i].weight <= w){
          let val = Math.max((table[i-1][w]), (newItems[i].price + table[i-1][w - newItems[i].weight]))
          table[i][w] = val;
          if (val > largestValue.val){
            largestValue.val = val;
            largestValue.i = i;
          }
        }
      }
    }
  }
  return [table, largestValue];
}


function getDefaultValueTable(i, w){
  let table = [];
  for(let j = 0; j <= i; j++){
    if (j === 0){
      let col = []
      for(let k = 0; k<=w; k++){
        col.push(0)
      }
      table.push(col)
    } else {
      table.push([0]);
    }
  }
  return table
}

let items = [
  {"weight":16,"price":2},
  {"weight":17,"price":95},
  {"weight":9,"price":14},
  {"weight":16,"price":36},
  {"weight":12,"price":29},
  {"weight":2,"price":34},
  {"weight":9,"price":80},
  {"weight":9,"price":78},
  {"weight":9,"price":2},
  {"weight":9,"price":75},
  {"weight":4,"price":42},
  {"weight":7,"price":33},
  {"weight":16,"price":94},
  {"weight":9,"price":23},
  {"weight":6,"price":38},
  {"weight":1,"price":5},
  {"weight":16,"price":96},
  {"weight":5,"price":88},
  {"weight":20,"price":40},
  {"weight":14,"price":42},
  {"weight":12,"price":51},
  {"weight":1,"price":93},
  {"weight":1,"price":24},
  {"weight":8,"price":61},
  {"weight":19,"price":14},
  {"weight":1,"price":36},
  {"weight":19,"price":70},
  {"weight":5,"price":32},
  {"weight":20,"price":93},
  {"weight":4,"price":32},
  {"weight":9,"price":94},
  {"weight":19,"price":89},
  {"weight":1,"price":9},
  {"weight":1,"price":43},
  {"weight":8,"price":16},
  {"weight":17,"price":89}
];


let W = 176;
let result = greedyThief(items, W);
console.log(result);
