const device = wx.getSystemInfoSync();
// 配置
const defOpt = {
    lineWidth: 2,
    lineNum: 90,
    padding: 14
};

const animation = wx.createAnimation({
    delay: 200,
    timingFunction: 'ease'
});

let ctx;

Component({
    properties: {
        min: {
            type: Number,
            value: 0
        },
        max: {
            type: Number,
            value: 100
        },
        val: {
            type: Number,
            value: 50,
            observer(val) {
                this.drawPage(val);
            }
        },
        width: {
            type: Number,
            value: 750
        },
        height: {
            type: Number,
            value: 400
        },
        colors: {
            type: Array,
            value: [{
                percent: 50,
                color: '#67C23A'
            }, {
                percent: 80,
                color: '#E6A23C'
            }, {
                percent: 100,
                color: '#F56C6C'
            }]
        }
    },
    data: {
        animationData: null,
        currentColor: '#ccc'
    },
    methods: {
        drawPage(val) {
            const percent = parseInt((val - this.data.min) / (this.data.max - this.data.min) * 100, 10);

            const deg = 180 * (percent / 100) - 90;
            // console.log(val, percent, deg)
            animation.rotate(deg).step();

            this.setData({
                currentColor: this.getCurrentColor(percent),
                animationData: animation.export()
            });
        },
        getCurrentColor(percent) {
            const stepPercent = Math.min(percent || 0, 100);
            let result;
            for (let ci = 0; ci < this.data.colors.length; ci++) {
                const colorObj = this.data.colors[ci];
                if (stepPercent < colorObj.percent) {
                    result = colorObj.color;
                    break;
                }
            }
            return result;
        },
        drawPanel() {
            if (!ctx) {
                return console.warn('error');
            }
            ctx.setFillStyle('red');
            ctx.fillRect(10, 10, 150, 100);
            ctx.draw();

            const halfWidth = parseInt(Math.min(this.data.width, 750) / 750 * device.windowWidth / 2, 10);
            const lineLength = parseInt(this.data.width / 750 * device.windowWidth / 20, 10);
            ctx.lineWidth = Math.round(this.data.width / 750) + 1;

            for (let i = 0; i < defOpt.lineNum; i++) {
                const stepPercent = parseInt(i / defOpt.lineNum * 100, 10);
                ctx.strokeStyle = this.getCurrentColor(stepPercent);

                ctx.save();
                ctx.translate(halfWidth, halfWidth);
                ctx.rotate(parseInt((180 / defOpt.lineNum * i - 90), 10) * Math.PI / 180);

                ctx.beginPath();
                ctx.moveTo(0, defOpt.padding - halfWidth);
                ctx.lineTo(0, defOpt.padding - halfWidth + lineLength);
                ctx.stroke();
                ctx.restore();
            }

            return ctx.draw();
        }
    },
    lifetimes: {
        attached() {
            ctx = wx.createCanvasContext('dial-canvas', this);
            this.drawPanel();
            if (this.data.val) {
                this.drawPage(this.data.val);
            }
        }
    }
});
