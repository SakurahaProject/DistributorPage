<template>
    <div class="calendar">
        <div class="nav">
            <button @click="prevWeek">前の週</button>
            <div>{{ weekLabel }}</div>
            <button @click="nextWeek">次の週</button>
        </div>
        <div class="days">
            <div class="day" v-for="day in weekDays" :key="day.date">
                <div class="weekday">{{ day.weekday }}</div>
                <div class="date">{{ day.dateObj.getDate() }}</div>
                <div class="schedule" v-for="s in day.schedules" :key="s.schedule">
                    <span class="schedule-emoji">{{ emojiMap[s.emoji_id] }}</span>
                    {{ s.schedule }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            emojiMap: {
                1: '🎮',
                2: '🎤',
                3: '💬',
                4: '🛒',
                5: '🎨',
            },
            weekdayMap: ['日', '月', '火', '水', '木', '金', '土'],
            currentDate: new Date('2025-09-08'),
            weekDays: [],
        };
    },
    computed: {
        weekLabel() {
            const monday = this.getMonday(this.currentDate);
            return `${monday.getFullYear()}-${(monday.getMonth() + 1).toString().padStart(2, '0')}-${monday
                .getDate()
                .toString()
                .padStart(2, '0')}`;
        },
    },
    methods: {
        getMonday(d) {
            const date = new Date(d);
            const day = date.getDay();
            const diff = day === 0 ? -6 : 1 - day;
            date.setDate(date.getDate() + diff);
            return date;
        },
        formatDate(date) {
            return date.toISOString().split('T')[0];
        },
        async fetchSchedules(date) {
            try {
                const response = await axios.get('https://api.sakurahaarisu.net/v1/schedule', {
                    params: { date: this.formatDate(date) },
                });
                return response.data[0]?.schedules || [];
            } catch (error) {
                console.error('API取得エラー:', error);
                return [];
            }
        },
        async renderWeek() {
            const monday = this.getMonday(this.currentDate);
            const days = [];
            for (let i = 0; i < 7; i++) {
                const dayDate = new Date(monday);
                dayDate.setDate(monday.getDate() + i);
                const schedules = await this.fetchSchedules(dayDate);
                days.push({
                    date: this.formatDate(dayDate),
                    dateObj: dayDate,
                    weekday: this.weekdayMap[dayDate.getDay()],
                    schedules: schedules,
                });
            }
            this.weekDays = days;
        },
        prevWeek() {
            this.currentDate.setDate(this.currentDate.getDate() - 7);
            this.renderWeek();
        },
        nextWeek() {
            this.currentDate.setDate(this.currentDate.getDate() + 7);
            this.renderWeek();
        },
    },
    mounted() {
        this.renderWeek();
    },
});
</script>

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    background: #fff0f5;
    display: flex;
    justify-content: center;
    padding: 20px;
}
.calendar {
    background: #fff;
    border-radius: 25px;
    padding: 20px;
    width: 95%;
    max-width: 400px;
    box-shadow: 0 5px 20px rgba(255, 105, 180, 0.3);
}
.days {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.day {
    background: #ffe4e1;
    border-radius: 20px;
    padding: 12px;
    min-height: 70px;
    transition: transform 0.2s;
}
.day:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(255, 105, 180, 0.2);
}
.date {
    font-weight: bold;
    margin-bottom: 6px;
    color: #ff1493;
}
.weekday {
    font-size: 0.9em;
    color: #ff69b4;
    margin-bottom: 4px;
}
.schedule {
    background: #fff0f5;
    border-radius: 12px;
    padding: 5px 7px;
    margin-top: 4px;
    font-size: 0.85em;
    color: #c71585;
    display: flex;
    align-items: center;
}
.schedule-emoji {
    margin-right: 5px;
}
.nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
.nav button {
    background: linear-gradient(45deg, #ffb6c1, #ff69b4);
    border: none;
    border-radius: 12px;
    padding: 6px 12px;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    transition: background 0.3s;
}
.nav button:hover {
    background: linear-gradient(45deg, #ff69b4, #ff1493);
}
</style>
