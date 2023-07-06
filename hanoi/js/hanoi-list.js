const HanoiActionList = {
    data() {
        return {
            actionList: [],
            endIndex: 1,
            endStatus: 'passed',
            endMsg: '[在此处暂停]',
            isModified: false
        }
    },
    watch: {
        isModified(val) {
            if(val) {
                this.endStatus = 'info'
                this.endMsg = '[已改动，再次点击还原]'
            }
        },
        actionList(val) {
            this.clickAction(val.length)
        }
    },
    methods: {
        clickAction(index) {
            this.isModified = false
            if (this.$hanoi) {
                const initState = this.$hanoi.initState
                this.$hanoi.hanoiState = this.$hanoi.deepCopy(initState)
                if (index > -1) {
                    for (let listIndex = 0; listIndex < this.actionList.length; listIndex++) {
                        try {
                            this.$hanoi.tryToMove(this.actionList[listIndex][0], this.actionList[listIndex][1], this.actionList[listIndex][2])
                        } catch (error) {
                            this.endIndex = listIndex
                            this.endStatus = 'error'
                            this.endMsg = error.message
                            this.$hanoi.applyState()
                            return
                        }
                        if (listIndex == index) {
                            this.endIndex = listIndex
                            this.endStatus = 'passed'
                            this.endMsg = '[在此处暂停]'
                            this.$hanoi.applyState()
                            return
                        }
                    }
                    this.endIndex = this.actionList.length - 1
                    this.endStatus = 'passed'
                    this.endMsg = '[执行完成]'
                } else {
                    this.endIndex = -1
                    this.endMsg = null
                }
                this.$hanoi.applyState()
            }
        }
    }
}
const HanoiActionComponent = {
    props: {
        plateId: Number,
        fromPillar: Number,
        toPillar: Number,
        status: String,
        isInit: Boolean,
        addtionalMsg: String,
        scrollIntoView: Boolean
    },
    emits: ['clickAction'],
    data() {
        return {
            isHover: false
        }
    },
    computed: {
        statusClass() {
            return {
                'hanoi-action-ignore': this.status === 'ignore',
                'hanoi-action-passed': this.status === 'passed',
                'hanoi-action-error': this.status === 'error',
                'hanoi-action-info': this.status === 'info',
                'hanoi-action-hover': this.isHover
            }
        }
    },
    template: `\
        <li class="hanoi-action" :class="statusClass" @mouseenter="isHover = true" @mouseleave="isHover = false" @click="clickAction">
            <p v-if="!isInit">
                将{{ plateId + 1 }}号盘子从柱子“{{ fromPillar + 1 }}”移动到柱子“{{ toPillar + 1 }}”
            </p>
            <p v-else>初始状态</p>
            <p v-if="addtionalMsg">{{ addtionalMsg }}</p>
        </li>
    `,
    methods: {
        clickAction(event) {
            this.$emit('clickAction')
        }
    },
    mounted() {
        if(this.scrollIntoView) {
            this.$el.scrollIntoView()
        }
    },
    watch: {
        scrollIntoView(val) {
            if(val) {
                this.$el.scrollIntoView()
            }
        }
    }
}