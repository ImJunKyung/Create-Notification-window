// (1) dialog 관련
// 구성 계획은, id="dialog"를 가지는 div태그에 'visible'이라는 클래스를 추가함으로써 숨겨둔 알림창을 보여줄 것이다

// 'dialog' ID를 가지는 Element를 dialog 변수에 대입
const dialog = document.getElementById('dialog');

// HTML문서 내에 id="dialog" 가 있을 때에만 실행
if(dialog) {
    // createButton 함수를 만들고 함수의 기능은, 받은 매개변수를 객체화하여 리턴하게 한다
    dialog.createButton = function(text, onclick) {
        // 리턴으로 오브젝트를 돌려준다
        return {
            // key : value 한 쌍
            text : text,
            onclick : onclick
        };
    }

    // 알림창을 숨기는 함수. 클래스 'visible'을 지움으로써 알림창을 닫는다(숨긴다)
    dialog.hide = function() {
        dialog.classList.remove('visible');
    }
    
    // 알림창을 생성(숨김 해제)하는 로직. 클래스 'visible'을 부여하면서 알림창을 보여준다.
    // show 함수는 "params"라는 매개변수를 받으며 실행된다 params는 JSON오브젝트로 받게 된다.
    dialog.show = function(params) {
        // dialog의 자식이 되는 rel="modal" Element 선택
        const modal = dialog.querySelector(':scope > [rel="modal"]');
        // modal의 자식 중 되는 rel="buttonContainer" Element 선택
        const buttonContainer = modal.querySelector('[rel="buttonContainer"]');
        // modal의 자식이 되는 title,content 요소의 내부 텍스트 값을 매개변수의 title,content 이름의 key 값을 불러와 대입
        modal.querySelector('[rel="title"]').innerText = params['title'];
        modal.querySelector('[rel="content"]').innerText = params['content'];
        // buttonContainer의 내부 요소들을 초기화한다
        // innerText : 요소 내부의 텍스트 삽입, 변경 / innerHTML : 요소 내부에 요소를 재배치,삭제 할 수 있음
        buttonContainer.innerHTML = '';
        // 매개변수의 key중 이름이 "buttons"가 있고 buttons(배열)의 길이가 0 초과일 때.
        if(params['buttons'] && params['buttons'].length > 0) {
            // 반복문을 통해 변수 "button"에 매개변수에서 받은 ['buttons']배열을 복사한다.
            for(const button of params['buttons']) {
                // <div>태그를 생성하고 buttonElement변수에 담는다.
                const buttonElement = document.createElement('div');
                // 요소에 class를 추가한다 (css적용을 위해)
                buttonElement.classList.add('button');
                // 요소에 텍스트를 추가한다(버튼명)
                buttonElement.innerText = button['text'];
                // 요소에 이벤트를 추가한다(버튼을 누르면 나올 동작)
                // (이 프로젝트에서는 클릭 시 기능 구현까지는 하지 않을 생각이다)
                buttonElement.onclick = button['onclick'];
                // 최종적으로 [rel="buttonContainer"]인 요소에 buttonElement의 값들을 삽입한다
                buttonContainer.append(buttonElement);
            }
        }
        // show함수는 위의 과정을 거쳐 최종적으로 dialog(div 태그)에 'visible'클래스명을 부여한다.
        dialog.classList.add('visible');
    }
}

// (1) dialog end


// (2) submit(value를 받아 알림창에 적용)관련
// 기본적인 공백값 검사와 submit버튼을 누른 후 알림창에 들어갈 정보를 전달하는 로직을 구현하였다.

// 'customForm' ID를 가지는 form을 customForm 변수에 대입
const customForm = document.getElementById('customForm');

customForm.onsubmit = function(e) {
    /*
    e.preventDefault함수는 이벤트가 발생한(여기서는 submit)요소의 기본 동작을 막는다.
    HTML 폼(form)의 역할은 submit을 통해 페이지를 다시 로드하고 새로운 페이지로 이동하는 것이고,
    이를 방지하고 기존 페이지에 남아있게 하기 위해 form의 submit 이벤트에 대한 기본 동작을 막을 필요가 있다.
    이를 위해 e.preventDefault()를 사용하게 된다.
    */
    e.preventDefault();
    /*
    후에 라디오 버튼의 체크 상태를 확인해야 하는데 라디오는 name속성이 같은 것끼리 묶이기 때문에
    name명으로 각 radio버튼이 지닌 value값을 불러올 수는 없다 이 점에 유의하면서 버튼 자체의 값 접근은 "rel"속성을 사용하였다
    customForm['btCount'].value <- 사용자가 현재 선택한 value를 불러옴
    */
    const radio = customForm.querySelector('[rel="radio"]');

    // 사용자로 하여끔 빈칸이 없게 경고창을 띄운다.
    // customForm이 지닌 요소 중 name이 'customTitle'인 요소를 찾는다.
    if(customForm['customTitle'].value === '') {
        alert('알림창의 제목을 입력해 주세요.');
        return false;
    } else if(customForm['customContent'].value === '') {
        alert('알림창의 내용을 입력해 주세요.');
        return false;
    }

    const radioButton2 = radio.querySelector(':scope > [rel="bt2"]');
    const radioButton3 = radio.querySelector(':scope > [rel="bt3"]');
    // radio버튼 2번이 선택된 경우
    if(radioButton2.checked) {
        // 버튼2의 이름이 지정되지 않으면 이벤트 중지
        if(customForm['button2'].value === '') {
            alert('두 번째 버튼의 이름을 지정해 주세요.');
            return false;
        }
        // 요소에 id 속성 추가
        radioButton2.setAttribute('id', 'radioNumber2Selected');
    }
    // radio버튼 3번이 선택된 경우
    if(radioButton3.checked) {
        // 버튼2,버튼3의 이름이 지정되지 않으면 이벤트 중지
        if(customForm['button2'].value === '') {
            alert('두 번째 버튼의 이름을 지정해 주세요.');
            return false;
        } else if(customForm['button3'].value === '') {
            alert('세 번째 버튼의 이름을 지정해 주세요.');
            return false;
        }
        // 요소에 id 속성 추가
        radioButton3.setAttribute('id', 'radioNumber3Selected');
    }

    // 사용자가 선택한 컬러값 변수에 담기
    const color = customForm['colors'].value;
    // 사용자가 선택한 버튼의 갯수 변수에 담기
    const buttonCount = customForm['btCount'].value;
    // title영역을 잡아두고 사용자가 지정한 색으로 변경
    const notificationTitle = dialog.querySelector('[rel="title"]');
    notificationTitle.style.backgroundColor = color;
    // buttons 배열 생성
    const buttons = [
        {
            "text" : '닫기',
            "onclick" : function() {
                dialog.hide();
            }
        }
    ];

    // 버튼이 2개 이상일 경우 생성해둔 배열에 오브젝트 추가
    if(buttonCount === '2') {
        const bt2 = {
            "text" : customForm['button2'].value,
            "onclick" : function() {
                return;
            }
        }
        buttons.push(bt2);
    } else if(buttonCount === '3') {
        const bt2 = {
            "text" : customForm['button2'].value,
            "onclick" : function() {
                return;
            }
        }
        const bt3 = {
            "text" : customForm['button3'].value,
            "onclick" : function() {
                return;
            }
        }
        buttons.push(bt2,bt3);
    }

    dialog.show({
        title: customForm['customTitle'].value,
        content: customForm['customContent'].value,
        // 위에서 작업이 끝난 배열을 대입
        buttons: buttons
    });

    console.log(buttons);
}
// (2) submit end
