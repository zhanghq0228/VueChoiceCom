var twoSum = function(nums, target) {
  var map = {};
  for (var i = 0; i < nums.length; i++) {
    // i=0时候 map[10-1]=map[9]不存在 map[10-2]=map[8]不存在 map[10-4]=map[7]存在 返回  [map[7] = 3,i=3]
    if (map[target - nums[i]] >= 0) {
      return [map[target - nums[i]], i];
    }
    map[nums[i]] = i;
    console.log(map[target - nums[i]], i);
  }
};

console.log(twoSum([1, 2, 3, 5, 6, 7, 12], 10));

function ListNode(val) {
  this.val = val;
  this.next = null;
}

// var addTwoNumbers = function(l1, l2) {
//   var newl1 = [];
//   for (var i = l1.length - 1; i >= 0; i--) {
//     for (var j = l2.length - 1; j >= 0; j--) {
//       // newl2 += arr[i];
//       newl1.push(arr[i] + arr[j] > 10 ? 0 : arr[i] + arr[j]);
//     }
//   }

//   return newl1;
// };
// console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));
const aa = new ListNode([2, 4, 3]);
console.log(aa);
var lengthOfLongestSubstring = function(s) {
  let arr = [],
    max = 0;
  for (var i = 0; i < s.length; i++) {
    if (arr.includes(s[i])) {
      var index = arr.indexOf(s[i]);
      console.log(index);
      arr.splice(0, index + 1);
    }
    arr.push(s[i]);
  }
  // for (const key of s) {
  //   if (arr.includes(key)) {
  //     var index = arr.indexOf(key);
  //     console.log(index);
  //     arr.splice(0, index + 1);
  //   }
  //   arr.push(key);
  //   max = max > arr.length ? max : arr.length;
  // }
  console.log(arr);
};
var lengthOfLongestSubstring = function(s) {
  let arr = [];
  let max = 0;
  for (let item of s) {
    if (arr.includes(item)) {
      let index = arr.indexOf(item);
      arr.splice(0, index + 1);
    }
    arr.push(item);
    max = max > arr.length ? max : arr.length;
  }
  return max;
};

console.log(lengthOfLongestSubstring('abcabcdef'));
console.log(2 ** 31);
