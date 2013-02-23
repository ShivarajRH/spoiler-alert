$(function() {
  $('spoiler, .spoiler').each(function() {
    var $spoiler = $(this)
    $spoiler.data('state', 'shrouded')

    var animationTimer = null
    var step = 0

    var cancelTimer = function() {
      if (animationTimer) {
        clearTimeout(animationTimer)
        animationTimer = null
      }
    }

    var applyBlur = function() {
      var radius = 10 - step
      var blurValue = 'blur('+radius+'px);'
      console.log(blurValue)
      if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        $spoiler.css('filter', 'url(./blur.svg#blur'+radius+')')
      } else {
        $spoiler.css('filter', blurValue)
        $spoiler.css('-webkit-filter', 'blur('+radius+'px)')
        $spoiler.css('-moz-filter', 'blur('+radius+'px)')
        $spoiler.css('-o-filter', 'blur('+radius+'px)')
        $spoiler.css('-ms-filter', 'blur('+radius+'px)')
      }
    }

    var reveal = function() {
      cancelTimer()
      var finalStep = $spoiler.data('state') == 'shrouded' ? 6 : 10
      if (step < finalStep) {
        step++
        applyBlur()
        animationTimer = setTimeout(reveal, 10)
      }
    }

    var shroud = function() {
      cancelTimer()
      if (step > 0) {
        step--
        applyBlur()
        animationTimer = setTimeout(shroud, 10)
      }
    }
    applyBlur()

    $(this).on('mouseover', function(e) {
      if ($spoiler.data('state') == 'shrouded') reveal()
    })
    $(this).on('mouseout', function(e) {
      if ($spoiler.data('state') == 'shrouded') shroud()
    })
    $(this).on('click', function(e) {
      $spoiler.data('state', $spoiler.data('state') == 'shrouded' ? 'revealed' : 'shrouded')
      $spoiler.data('state') == 'shrouded' ? shroud() : reveal()
    })
  })
})