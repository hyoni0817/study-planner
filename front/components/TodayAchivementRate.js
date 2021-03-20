import React from 'react';
import { Progress } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ProgressWrapper = styled.div`
    display: table-cell;
    text-align: center;
    `
const CheerUpWrapper = styled.div`
    font-size: 20px;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
`

const CheerUpContent = styled.p`
    font-weight: 600;
`

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
            <div style={{display: 'table-row'}}>
                <ProgressWrapper>
                    <Progress
                        type="circle"
                        strokeColor={{
                            '0%': '#61DDAA',
                            '100%': '#61DDAA',
                        }}
                        percent={value}
                        format={(percent) => percent == 100 ? <CheckOutlined style={{color: '#61DDAA'}} /> : `${percent}%`}
                    />
                </ProgressWrapper>
                <CheerUpWrapper>
                    <CheerUpContent>{onChangeCheerUp()}</CheerUpContent>
                </CheerUpWrapper>
            </div>
        </>
    )
};

export default TodayAchivementRate;