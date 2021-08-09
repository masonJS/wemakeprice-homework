<template>
  <div>
    <div class="input-wrap">
      <h2 class="wrap__title">Input</h2>
      <div class="input-box">
        <label for="url">URL</label>
        <input type="text" name="url" id="url" v-model="data.url">
      </div>
      <div class="input-box">
        <label for="type">타입</label>
        <select name="type" id="type" v-model="data.type">
          <option v-for="(type, index) in types" :key="index" :value="type.value">
            {{ type.name }}
          </option>
        </select>
      </div>
      <div class="input-box">
        <label for="amount">양</label>
        <input type="number" name="amount" id="amount" v-model.number="data.amount">
      </div>
      <button @click="printHomework">출력</button>
    </div>
  </div>
</template>

<script>
import { isValidUrl } from '../libs/isValidUrl'
export default {
  name: 'Homework',
  data(){
    return {
      data: {
        url: '',
        type: '',
        amount: 0
      },
      types : [
        {
          name: '전체',
          value: 'total'
        },
        {
          name: '테그만 제외',
          value: 'exceptTag'
        }
      ]
    }
  },
  methods: {
    printHomework(){
      try{
        this.checkUrl(this.data.url)
        this.checkType(this.data.type)
        this.checkAmount(this.data.amount)

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
      console.log(type)
      if(!type) throw new Error('type을 선택해주세요.')
      const isValid = this.types.some(data => data.value === type)
      if(!isValid)
        throw new Error('유효하지 않은 type입니다')
    },
    checkAmount(amt){
      if(amt === undefined) throw new Error('amount을 입력해주세요.')
      const isValid = typeof amt === 'number' && amt > 0
      if(!isValid)
        throw new Error('유효하지 않은 amount입니다')
    }

  }
}
</script>
<style>
.input-wrap{
  width: 50%;
  margin: 1rem auto 0;
}
.wrap__title{
  width: 100%;
  font-style: normal;
  font-weight: bold;
  margin: 0;
}
.input-box {
  padding: 5px 0;
  border-bottom: 1px solid #ebebeb;
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
  font-size: 0.8rem;
}
</style>
