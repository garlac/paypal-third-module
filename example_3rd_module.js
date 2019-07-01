const thirdmodule = require("./third_module")

//Example1:
postArray = [
    {
      "start_index" : 14,
      "end_index" : 22,
      "type": "entity"
    },
    {
      "start_index" : 0,
      "end_index" : 5,
      "type": "entity"
    },
    {
      "start_index" : 55,
      "end_index" : 67,
      "type": "twitter_username"
    },
    {
      "start_index" : 37,
      "end_index" : 54,
      "type": "link"
    }
  ]

feed = new thirdmodule.Feed("Obama visited Facebook headquarters: http://bit.ly/xyz @elversatile",postArray)
console.log(feed.convertFeed())

//Example2
postArray1 = [
    {
      "start_index" : 90,
      "end_index" : 102,
      "type": "twitter_username"
    }
  ]

feed1 = new thirdmodule.Feed("I will present our paper Interactive Visualization of Flood and Heavy Rain Simulations at @eurovis2019!",postArray1)
console.log(feed1.convertFeed())