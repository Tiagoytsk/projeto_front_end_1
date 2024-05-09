<template>
    <div>
      <h1>Search History</h1>
      <ul>
        <li v-for="(search, index) in searchHistory" :key="index">
          {{ search }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchHistory: []
      }
    },
    methods: {
      search(query) {
        // Your search function here
  
        // After the search, add the query to the history
        this.searchHistory.push(query);
      }
    }
  }
  </script>