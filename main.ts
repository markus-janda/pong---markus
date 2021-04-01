// 往左
input.onButtonPressed(Button.A, function () {
    if (bar_x > 0) {
        led.unplot(bar_x + 1, 4)
        bar_x = bar_x - 1
        led.plot(bar_x, 4)
    }
})
input.onButtonPressed(Button.AB, function () {
    game.pause()
})
// 往右
input.onButtonPressed(Button.B, function () {
    if (bar_x < 3) {
        led.unplot(bar_x, 4)
        bar_x = bar_x + 1
        led.plot(bar_x + 1, 4)
    }
})
input.onGesture(Gesture.Shake, function () {
    game.resume()
})
let in_game = false
let ball_dy = 0
let ball_dx = 0
let ball_y = 0
let ball_x = 0
let interval_step = 0
let interval = 0
let point = 0
let bar_x = 0
basic.showString("Welcome to Pong")
basic.forever(function () {
    point = 0
    interval = 500
    interval_step = 10
    ball_x = 3
    ball_y = 4
    ball_dx = -1
    ball_dy = -1
    bar_x = 0
    basic.showString("3")
    basic.showString("2")
    basic.showString("1")
    basic.showString("GO!")
    led.plot(ball_x, ball_y)
    led.plot(bar_x, 4)
    led.plot(bar_x + 1, 4)
    in_game = true
    while (in_game) {
        if (ball_x + ball_dx > 4) {
            ball_dx = ball_dx * -1
        } else if (ball_x + ball_dx < 0) {
            ball_dx = ball_dx * -1
        }
        if (ball_y + ball_dy < 0) {
            ball_dy = ball_dy * -1
        } else if (ball_y + ball_dy > 3) {
            if (led.point(
            ball_x + ball_dx,
            ball_y + ball_dy
            )) {
                ball_dy = ball_dy * -1
                point = point + 1
                if (interval - interval_step >= 0) {
                    interval = interval - interval_step
                }
            } else {
                in_game = false
            }
        }
        if (in_game) {
            led.plot(
            ball_x + ball_dx,
            ball_y + ball_dy
            )
            led.unplot(ball_x, ball_y)
            ball_x = ball_x + ball_dx
            ball_y = ball_y + ball_dy
            basic.pause(interval)
        } else {
            basic.showIcon(IconNames.No)
            music.playMelody("C5 A B G A F G E ", 120)
            game.gameOver()
            game.setScore(point)
        }
    }
})
