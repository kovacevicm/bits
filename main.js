let targetValue
let currentValue

const reset = () => {
  targetValue = getRandom255()
  currentValue = 0
  console.log(`Generated target is ${targetValue}`)
  render()
}

const render = () => {
  $('#bits').empty()

  $('#target span').text(targetValue)
  $('#result span').text(currentValue)

  const bits = [...(currentValue >>> 0).toString(2).padStart(8, '0')]
  bits.map(bit => Number.parseInt(bit))
    .map((bit, index) => createBitBtn(bit, 7 - index))
    .forEach(btn => btn.appendTo('#bits'))

  if (targetValue === currentValue) {
    $('#target span, #result span').addClass("win")
  } else {
    $('#target span, #result span').removeClass("win")
  }
}

const getRandom255 = () => {
  return Math.floor(Math.random() * 256)
}

const createBitBtn = (bit, place) => {
  const decimalVal = Math.pow(2, place)
  return $(`
    <div class="bitBtn">
        <div>
            <span>${bit}</span>
        </div>
        <div>
            <button>${decimalVal}</button>
        </div>
    </div>`).click(createBitBtnCallback(bit, decimalVal))
}

const createBitBtnCallback = (bit, decimalValue) => {
  return () => {
    if (bit === 0) {
      currentValue += decimalValue
    } else {
      currentValue -= decimalValue
    }
    render()
  }
}

$('#target button').click(reset)
$('#btnPlus').click(() => {
  currentValue += 1
  render()
})
$('#btnMinus').click(() => {
  currentValue -= 1
  render()
})
reset()
render()