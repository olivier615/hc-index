<template>
<audio controls="controls" ref="audio" hidden></audio>
<div class="gg">
  <div class="ab"></div>
</div>
  <div class="container py-2 text-light">
    <h2 class="text-center my-3 font-b fs-1">23BT 歲末抽獎</h2>
    <div class="row">
      <div class="d-flex flex-column flex-md-row align-item-center justify-content-center py-2 col-12 mb-3 bg-pur">
        <h3 class="me-3 mt-2 fs-2 text-center mb-2 mb-md-0 font-b">加勒比海大獎</h3>
        <h3 class="ms-3 text-warning text-center " id="showCountContainer">999999</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 font-b">
        <div class="fs-5 mb-2 py-2 px-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center bg-semiDark border-out"
        v-for="item in luckyDrawLeft" :key="item._id">
          <div class="">
            <p>{{ item.order }}. {{ item.content }}</p>
          </div>
          <div class="align-self-md-center align-self-end" style="max-width: 40%">
            {{ item.winner }}</div>
        </div>
      </div>
      <div class="col-12 col-md-6 font-b">
        <div class="fs-5 mb-2 py-2 px-3 d-flex justify-content-between align-items-center bg-semiDark border-out"
        v-for="item in luckyDrawRight" :key="item._id">
          <div class="">
            <p>{{ item.order }}. {{ item.content }}</p>
          </div>
          <div class="" style="max-width: 40%">
            {{ item.winner }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      jackpot: 999999,
      luckyDrawLeft: [],
      luckyDrawRight: []
    }
  },
  methods: {
    renderJackpot () {
      const arr = String(this.jackpot).split('')
      const arrLength = arr.length
      let html = ''
      for (let i = 0; i < arrLength; i++) {
        html += `<div id="num_${i}" class="numberBox" data-id="${i}">`
        html += this.renderRollingNumber()
        html += '</div>'
      }
      document.querySelector('#showCountContainer').innerHTML = html
    },
    renderRollingNumber (num = 10) {
      let html = '<span class="numberColumn">'
      for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
          html += `<i class="text-warning">${j}</i>`
        }
      }
      html += '</span>'
      return html
    },
    rollingAnimation () {
      const arr = String(this.jackpot).split('')
      const dom = document.querySelectorAll('.numberBox')
      const domLength = dom.length
      const spanHeight = dom[0].querySelector('.numberColumn').offsetHeight
      for (let j = 0; j < domLength; j++) {
        const newPrice = document.createElement('i')
        newPrice.innerHTML = arr[dom[j].getAttribute('data-id')]
        dom[j].querySelector('.numberColumn').appendChild(newPrice)
        dom[j].querySelector('.numberColumn').style.transition = 'all ' + (3 / (j + 1)) + 's ease-in-out .2s'
        dom[j].querySelector('.numberColumn').style.transform = 'translate3d(0,-' + spanHeight + 'px,0)'
      }
    },
    getLuckyDraw () {
      this.$http.get(`${this.url}/luckyDraw`)
        .then(res => {
          const sortData = res.data.data.sort(function (a, b) {
            return a.order - b.order
          })
          this.luckyDrawLeft = sortData.slice(0, 8)
          this.luckyDrawRight = sortData.slice(8, sortData.length)
        })
    },
    getCounting () {
      this.$http.get(this.url + '/counting')
        .then(res => {
          this.data = res.data.data[0]
          let donate = 0
          this.data.donate.forEach(item => {
            donate += item.bonus
          })
          const newJackpot = ((this.data.ticket - 1) * 500) + this.data.basic + donate
          if (newJackpot !== this.jackpot) {
            this.playAudio()
          }
          this.jackpot = newJackpot
          this.renderJackpot()
          this.rollingAnimation()
        })
        .catch(err => {
          const info = {
            icon: 'error',
            title: err.response.data.message
          }
          console.log(info)
        })
    },
    getData () {
      this.getLuckyDraw()
      this.getCounting()
    },
    playAudio () {
      this.$refs.audio.src = require('../assets/audio/ring.mp3')
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
    Login () {
      this.$socket.emit('login', this.msg)
    }
  },
  mounted () {
    this.getLuckyDraw()
    this.getCounting()
    // setInterval(() => this.getData(), 20000)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap');

.font-b {
  font-family: 'Noto Sans TC', sans-serif;
}

i {
  color: #ffc107 !important;
}
.gg {
  position: relative;
}

.ab {
  position: absolute;
  opacity: .2;
  z-index: -1;
  top: 0;
  left: 0;
  background-image: url(../assets/image/light_2.svg);
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
.numberBox {
  width: 48px;
  height: 48px;
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.numberColumn {
  display: inline-block;
  text-align: center;
  overflow: hidden;

}
.numberColumn i {
  width: 48px;
  height: 48px;
  display: block;
  text-align: center;
  font-style: normal;
  font-size: 48px;
  color: #fff;
  font-weight: bolder;
}

.bg-pur {
  /* background-image: linear-gradient( 134.6deg,  rgba(201,37,107,1) 15.4%, rgba(116,16,124,1) 74.7% );
  box-shadow: 1px 0 4px 3px rgba(15, 15, 15, 0.2), -1px 0 4px 3px rgba(19, 4, 4, 0.815); */
  border-radius: 8px;
  background-image: linear-gradient( 106.9deg,  rgba(148,14,60,1) 60.9%, rgba(3,22,27,1) 122.3% );
}

.bg-semiDark {
  /* background: #141e3075;
  background: -webkit-linear-gradient(to right, hsla(212, 39%, 15%, 0.7), hsla(219, 41%, 13%, 0.7));
  background: linear-gradient(to right, rgba(19, 32, 46, 0.7), rgba(20, 30, 48, 0.7)); */
  background-image: radial-gradient( circle 1192px at 21.5% 49.5%,  rgba(91,21,55,1) 0.1%, rgba(0,0,0,1) 100.2% );
}

.border-out {
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  box-shadow: 1px 0 4px 3px rgba(15, 15, 15, 0.2), -1px 0 4px 3px rgba(19, 4, 4, 0.815);
  border-radius: 8px;
}
</style>
