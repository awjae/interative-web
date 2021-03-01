// Import stylesheets
import './style.css';
import { ToggleButton } from './solution/presenter/toggle-button/index';


const bootstrap = () => {
    const buttonData = [
        'Bold', 'Italic', 'Underline'
    ]
    const toggleButton = new ToggleButton({
        selector: '#toggle-button',
        data: buttonData
        //체인지 이벤트 property를 추가해야 정상 작동됨
    })
}


bootstrap();
