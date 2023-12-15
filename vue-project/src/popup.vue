<script>
export default {
    name: "popup",
    props: {
        DataU: Object,
        refresh: Function,
        // closePopup: Function,
    },
    data() {
        return {
            formData: { ...this.DataU },
            tagNo: '',
            pipeSize: '',
            pipeLo: '',
            inInt: '',
            inDate: '',
        }
    },
    created() {
        this.refresh()
        console.log("-=-=-=-=-=createPopup-=-=-=-=")
        console.log(this.formData)
        console.log(this.DataU)
    },
    methods: {
        closePopup() {
            console.log("Close Popup")
            this.$emit('closePopup')
            this.tagNo = null
            this.pipeSize = null
            this.pipeLo = null
            this.inInt = null
            this.inDate = null
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
            console.log(formattedDate);
            return formattedDate;
        },
        Save() {
            console.log("I BA I BE i BO i BAE")
            this.tagNo = parseInt(this.formData.tag_no);
            this.pipeLo = this.formData.pipe_location
            this.pipeSize = this.formData.pipe_size
            this.inInt = this.formData.inspection_interval
            this.inDate = this.formData.installation_date
            if (this.tagNo &&
                this.pipeLo &&
                this.pipeSize &&
                this.inInt &&
                this.inDate
            ) {
                if (typeof this.tagNo !== "number") {
                    alert("Please input Tag No isn't number type");
                    console.log(this.tagNo)
                    console.log(typeof this.tagNo)
                }
                if (typeof this.pipeSize !== "number") {
                    console.log(this.pipeSize)
                    console.log(typeof this.pipeSize)
                    alert("Please input Pipe Size isn't number type");
                }
                if (typeof this.inInt !== "number") {
                    console.log(this.inInt)
                    console.log(typeof this.inInt)
                    alert("Please input Inspection Interval isn't number type");
                }
                if (typeof this.tagNo == "number" && typeof this.pipeSize == "number" && typeof this.inInt == "number") {
                    if (this.DataU == null) {
                        this.AddUser()
                    } else {
                        this.EditUser()
                    }
                }
            } else {
                alert("Please fill all required fields. ")
            }
        },
        AddUser() {
            console.log("add")
            console.log(this.tagNo)
            console.log(this.pipeSize)
            console.log(this.pipeLo)
            console.log(this.inDate)
            console.log(this.inInt)
            fetch('https://dis02.dexon-technology.com/api/dexon-exam/add-data', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": 0,
                    "tag_no": this.tagNo,
                    "pipe_size": this.pipeSize,
                    "pipe_location": this.pipeLo,
                    "installation_date": this.inDate,
                    "inspection_interval": this.inInt,
                    "is_active": true
                }),
            }).then(res => {
                if (!res.ok) {
                    throw new Error(`Error ${res.status}: ${res.statusText}`);
                }
                return res.json();
            }).then(res => {
                alert("Your Add Data have saved")
                this.closePopup()
                this.refresh()
            }).catch(error => {
                console.error('Fetch Error:', error);
            });
        },
        EditUser() {
            console.log("==========edit=========")
            console.log(this.DataU)
            fetch('https://dis02.dexon-technology.com/api/dexon-exam/edit-data', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "id": this.DataU.id,
                    "tag_no": this.tagNo,
                    "pipe_size": this.pipeSize,
                    "pipe_location": this.pipeLo,
                    "installation_date": this.inDate,
                    "inspection_interval": this.inInt,
                    "is_active": true
                })
            }).then(res => {
                if (!res.ok) {
                    throw new Error(`Error ${res.status}: ${res.statusText}`);
                }
                return res.json();
            }).then(res => {
                alert("Your Edit Data have saved")
                this.closePopup()
                this.refresh()
            })
                .catch(error => {
                    console.error('Fetch Error:', error);
                    // Handle error: show an error message or perform other actions
                });

        },
    }
}
</script>

<template>
    <div id="conM1" class="conM1">
        <div class="editContent">
            <span class="closeEdit" v-on:click="closePopup()">&times;</span>
            <div class="conEdit"><br />
                <label>{{ DataU == null ? "Add User" : "Edit User" }}</label>
            </div>
            <div class="conEdit">

                <div class="TH">
                    <p>Tag No.</p>
                    <p>ssss</p>
                </div>

                <div class="conInp">
                    <p class="label">Tag No :</p>
                    <input v-model="formData.tag_no" placeholder="Tag No." type="number">
                </div>

                <div class="conInp">
                    <p class="label">Pipe Size :</p>
                    <input v-model="formData.pipe_size" placeholder="Pipe Size" type="number">
                </div>

                <div class="conInp">
                    <p class="label">Pipe Location :</p>
                    <input v-model="formData.pipe_location" placeholder="Pipe Location" type="text">
                </div>

                <div class="conInp">
                    <p class="label">Inspection Interval:</p>
                    <input v-model="formData.inspection_interval" placeholder="Inspection Interval" type="number">
                </div>

                <div class="conInp">
                    <p>Inspection Date :</p>
                    <input v-model="formData.installation_date" placeholder="DD/MM/YYYY" type="date">
                </div>

            </div>
            <div>
                <input type="button" value="submit" v-on:click="Save()" class="editBut">
            </div><br/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.conM1 {
    position: fixed;
    transform: translate(10%, -150%);
    z-index: 9999;
    width: 80%;
    margin: auto;

    .editContent {
        background: floralwhite;
        width: 100%;
        margin: auto;
        border-radius: 5px;

        .conEdit {
            text-align: left;
            font-size: 30;
        }

        span {
            color: black;
            font-size: 30px;
            float: right;
            margin-right: 10%;
        }

        .conEdit {
            background: none;
            .TH {
                background: none;
                border-bottom: 1px solid;
            }

            .conInp {
                display: flex;
                justify-content: space-between;
                margin-left: 30%;

                input {
                    margin-right: 20%;
                    margin-top: 10px;
                    text-align: left;
                    background: none;
                    border: 1px solid;
                    border-radius: 5px;
                    height: 30px;
                    width: 50%;
                }
            }
        }
    }
}

.editBut {
    border: none;
    border-radius: 5px;
    background: green;
    margin-top: 20px;
    width: 6%;
    height: 30px;
    color: white;

    &:hover {
        cursor: pointer;
        background: rgb(128, 213, 0);
    }
}
</style>