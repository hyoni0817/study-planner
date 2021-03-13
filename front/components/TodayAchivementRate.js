import React from 'react';
import { Progress } from 'antd';

const TodayAchivementRate = ({value}) => {
    const onChangeCheerUp = () => {
        if(value > 0 && value < 50) {
            return '우리 좀 더 열심히 해봐요😉';
        } else if(value == 50) {
            return '이제 절반만 더 하면 돼요! 힘내요!💪';
        } else if(value > 50 && value <= 80) {
            return '잘하고 있어요! 점점 끝이 보여요!😊';
        } else if(value > 80 && value < 100) {
            return '이제 정말 얼마 남지 않았어요! 조금만 더 화이팅!🏃'
        } else if (value == 100) {
            return '짝짝짝👏👏👏 오늘 정말 수고많았어요!';
        } else if(value == 0){
            return '아직 완료한 할일이 없어요😢';
        }
    }
    return (
        <>
            <Progress
                type="circle"
                strokeColor={{
                    '0%': '#d76d77',
                    '100%': '#3a1c71',
                }}
                percent={value}
            />
            <span>{onChangeCheerUp()}</span>
        </>
    )
};

export default TodayAchivementRate;