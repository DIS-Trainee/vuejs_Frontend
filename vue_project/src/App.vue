<script >
import editP from "./views/popup.vue"
import addP from "./views/popup.vue"

export default {
  components: {
    editP,
    addP,
  },
  mounted() {
    this.createTable()
  },
  name: "home-main",
  data() {
    return {
      table: [],
      load: false,
      popClick: false,
      data: {},
    }
  },
  methods: {
    createTable() {
       //fetch('https://dis02.dexon-technology.com/api/dexon-exam/get-data-list')
      fetch('https://localhost:7080/api/PipeInfo/pipe-get-all')
        .then(res => {
          console.log(res)
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          console.log(data)
          console.log("          console.log(data)")
          this.table = data;
          this.load = true;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    //      fetch('https://dis02.dexon-technology.com/api/dexon-exam/get-data-list')
    // createTable() {
    //     .then(res => res.json())
    //     .then(res => {
    //       this.table = res
    //       this.load = true
    //     });
    // },
    openPopup(item) {
      this.popClick = !this.popClick;
      this.data = item
      console.log(this.data)
    },
    closePopup() {
      this.popClick = !this.popClick
    },
    del(item) {
      fetch('https://dis02.dexon-technology.com/api/dexon-exam/delete-data?id=' + item.id,
        { method: 'DELETE' })
        .then(response => response.json())
        .then(del => {
          console.log(item.id);
          alert("Delete Complete")
          this.createTable()
        })
    },
    formateDate(dateString) {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        console.error('Invalid date format');
        return;
      }

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    },
    searchTagNo(data) {
      const selectedTag = data.target.value;
      const selectedOption = this.table.find(item => item.tag_no === selectedTag);
      const checkA = data.is_active
      if (checkA) {

      }
      if (selectedOption) {
        const selectedId = selectedOption.id;
        console.log("Received ID:", selectedId);
        // Perform actions with the selectedId...
      }
    },
  }
}
</script>

<template>
  <div class="connav">
    <ul>
      <a href="#">Home</a>
      <a href="#">Checklist</a>
      <a href="#">Thickness</a>
      <a href="#">Data</a>
      <a style="float:right" href="https://www.youtube.com/watch?v=6OvT-bJy-Ow&ab_channel=DotaWatafak">DOTA2 WTF</a>
    </ul>
  </div>

  <div class="contain">
    <h1> Pipe Inspection </h1>

    <div class="conTable">
      <div class="searchTagNo">
        <input v-model="selectedTagNo" list="tagNo" @input="searchTagNo($event)" placeholder="  Search Tag No.">
      </div>
      <datalist id="tagNo">
        <option v-for="item in table" :value="item.tag_no" :data-id="item.id">No. {{ item.id }}</option>
      </datalist>

      <div class="addUser">
        <i class="gg-add-r" v-on:click="openPopup()"></i>
      </div>
      <div><br /></div>

      <b-table class="bTable" id="table" v-if="load">
        <tr>
          <th>Tag No</th>
          <th>Pipe Size</th>
          <th>Pipe Location</th>
          <th>Installation Date</th>
          <th>Inspection Interval</th>
          <th>Edit More</th>
        </tr>
        <tr v-for="item in table">
          <td v-if="item.is_active">{{ item.tag_no }}</td>
          <td v-if="item.is_active">{{ item.pipe_size }}</td>
          <td v-if="item.is_active">{{ item.pipe_location }}</td>
          <td v-if="item.is_active"> {{ formateDate(item.installation_date) }} </td>
          <td v-if="item.is_active">{{ item.inspection_interval }}</td>
          <td v-if="item.is_active">
            <button class="editBut" id="editBut" v-on:click="openPopup(item)"> Edit </button>
            <button class="delBut" id="delBut" v-on:click="del(item)">Delete</button>
          </td>
        </tr>
      </b-table>

      <editP v-if="popClick == true" :DataU="data" @closePopup="closePopup" :refresh="createTable"
        @formDate="formateDate" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/add-r.css');

.connav {
  height: 30px;

  ul {
    overflow: hidden;
    background-color: #333;

    a {
      display: inline;
      color: white;
      text-align: center;
      padding: 10px;
      float: left;
      text-decoration: none;

      &:hover {
        background: #111;
      }

    }
  }
}

.contain {
  aspect-ratio: 3/4;
  margin: auto;

  // text-align: center;
  // align-items: center;
  // justify-content: center;

}

h1 {
  text-align: center;
}

.addUser {
  display: inline;
  background: #000;
  float: right;
  margin-right: 10px;

  .gg-add-r {
    color: white;
    background: #0eb717;
    font-size: 20px;

    &:hover {
      background: #58db5f;
    }
  }
}

.searchTagNo {
  display: inline;
  text-align: center;
  background-color: none;

  input {
    width: 20%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid;
  }
}

.conTable {
  background: none;
  text-align: center;
  height: auto;
  width: 100%;
  // padding: 50px;

  .bTable {
    text-align: center;
    background: none;
    width: 100%;
    height: 100%;

    tr {
      background: rgb(58, 207, 63);
      text-align: center;
      margin: auto;

      th {
        border-bottom: 1px solid rgb(82, 78, 78);
        background: rgb(175, 215, 216);
        padding: 10px;
      }

      td {
        border-bottom: 1px solid rgb(61, 68, 71);
        background: rgb(214, 227, 227);
        width: 10%;
        height: 100%;
        //control size of all table


        .editBut {
          height: 30px;
          aspect-ratio: 2/1;
          border-radius: 5px;
          border: none;
          margin: 5px;
          background: #cb9549;

          &:hover {
            background: #ff9500;
            cursor: pointer;
          }
        }

        .delBut {
          height: 30px;
          aspect-ratio: 2/1;
          border-radius: 5px;
          border: none;
          margin: 5px;
          background: #c65019;

          &:hover {
            background: #f04d02;
            cursor: pointer;
          }
        }

      }
    }
  }
}
</style>
