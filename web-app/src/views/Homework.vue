<template>
  <div>
    <div class="input-wrap">
      <h2 class="wrap__title">[입력]</h2>
      <div class="input-box">
        <label for="url">URL</label>
        <input type="text" name="url" id="url" v-model="body.url">
      </div>
      <div class="input-box">
        <label for="type">Type</label>
        <select name="type" id="type" v-model="body.type">
          <option v-for="(type, index) in types" :key="index" :value="type.value">
            {{ type.name }}
          </option>
        </select>
      </div>
      <div class="input-box">
        <label for="amount">출력 단위 묶음</label>
        <input type="number" name="amount" id="amount" v-model.number="body.amount">
      </div>
      <div class="btn-wrap">
        <button @click="submitHomework">출력</button>
      </div>
    </div>
    <div class="input-wrap" v-if="isResponse">
      <h2 class="wrap__title">[출력]</h2>
      <div class="input-box">
        <label for="quota">몫</label>
        <p id="quota">{{ result?.quota }}</p>
      </div>
      <div class="input-box">
        <label for="remainder">나머지</label>
        <p id="remainder">{{ result?.remainder }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidUrl } from '@/libs/isValidUrl'
import { API } from "@/apis";
export default {
  name: 'Homework',
  data(){
    return {
      body: {
        url: '',
        type: '',
        amount: 0
      },
      result: {},
      types : [
        {
          name: 'HTML 태그 제외',
          value: 'exceptTag'
        },
        {
          name: 'Text 전체',
          value: 'allText'
        }
      ]
    }
  },
  computed:{
    isResponse() {
      return Object.keys(this.result).length
    }
  },
  methods: {
    async submitHomework(){
      try{
        this.checkUrl(this.body.url)
        this.checkType(this.body.type)
        this.checkAmount(this.body.amount)
        const response = await API.postHomeWork(this.body)
        this.result = response?.data
      } catch (e) {
        alert(e.message)
      }
    },
    checkUrl(url){
      if(!url) throw new Error('url을 입력해주세요.')
      const isValid = isValidUrl(url)
      if(!isValid) throw new Error('url 형식이 유효하지 않습니다.')
    },
    checkType(type){
      if(!type) throw new Error('type을 선택해주세요.')
      const isValid = this.types.some(data => data.value === type)
      if(!isValid)
        throw new Error('유효하지 않은 type입니다.')
    },
    checkAmount(amt){
      if(amt === undefined) throw new Error('amount을 입력해주세요.')
      const isValid = typeof amt === 'number' && amt > 0
      if(!isValid)
        throw new Error('유효하지 않은 amount입니다.')
    }

  }
}
</script>

<style>
p{
  display: inline-block;
  width: 75%;
}
input{
  width: 75%;
  height: 40px;
  border: none;
  radius: 0;
  cursor: text;
}
select{
  width: 75%;
  height: 40px;
  border: none;
  radius: 0;
}
label{
  display: inline-block;
  width: calc(25% - 10px);
  padding: 10px 0 5px;
  font-size: 1.2rem;
  font-weight: bold;
}
button{
  padding: 0.3rem 1.5rem;
  font-size: 1rem;
}

.input-wrap{
  width: 50%;
  margin: 10rem auto 0;
}
.btn-wrap{
  width: 100%;
  text-align: center;
  margin: 4rem 0 0
}
.wrap__title{
  width: 100%;
  font-style: normal;
  font-weight: bold;
  margin: 0 0 1.5rem;
}
.input-box {
  padding: 5px 0;
  border-bottom: 1px solid #ebebeb;
}
</style>
