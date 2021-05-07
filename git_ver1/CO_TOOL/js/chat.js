 const Chat = (function(){
        const myName = "me";

        //init함수
            function init(){
                 //enter 키 이벤트
                $(document).on('keydown','div.input-div textarea', function(e){     //$(document).on('click','id', function(e){})
                    if(e.keyCode==13 && !e.siftKey){
                        e.preventDefault();                                         //e.preventDefault(초기값으로 변화 안되게)
                        const message = $(this).val();
                            
                        //메시지 전송
                        sendMessage(message);
            
                        //입력창 clear
                        clearTextarea();
                        }
            
                    });

                $(document).on('click','div.input-div .sendbtn', function(e){
                        e.preventDefault();                                 //e.preventDefault(초기값으로 변화 안되게)
                        const message = $('div.input-div textarea').val();
                                
                        //메시지 전송
                        sendMessage(message);
                
                        //입력창 clear
                        clearTextarea();        
                        });
                }
    
        /* 
        //init함수
        function init(){
            //enter 키 이벤트
            $(document).on('keydown','div.input-div textarea', function(e){
                if(e.keyCode==13 && !e.siftKey){
                    e.preventDefault();                                 //e.preventDefault(초기값으로 변화 안되게)
                    const message = $(this).val();
                    
                    //메시지 전송
                    sendMessage(message);
    
                    //입력창 clear
                    clearTextarea();
                }
    
            });
        }
        */

        
        //메시지 태그 생성
        function createMessageTag(LR_className, senderName, message){
                //형식 가져오기
                let chatLi = $('div.chat.format ul li').clone();               //clone()    (선택한 요소를 복제)
    
                //값 채우기
                chatLi.addClass(LR_className);
                chatLi.find('.sender span').text(senderName);
                chatLi.find('.message span').text(message);
    
                $('div.chat:not(.format) ul').append(chatLi);
    
                //스크롤바 아래 고정
                $('div.chat').scrollTop($('div.chat').prop('scrollHeight'));
        }
        
        //메시지 태그 append
        function appendMessageTag(LR_className, senderName, message){
            const chatLi = createMessageTag(LR_className, senderName, message);
    
            $('div.chat:not(.format) ul').append(chatLi);
    
            //스크롤바 아래 고정
            $('div.chat').scrollTop($('div.chat').prop('scrollHeight'));
        }
    
        //메시지 전송
        function sendMessage(message){
            //서버에 전송하는 코드로 후에 대체
            const data ={
                "message"       :  message,
                "senderName"    : "you"                     //"senderName"    : "me"    오른쪽 메시지 출력
            };
    
            //통신하는 기능이 없으므로 여기서 receive
            receive(data);
        }
    
        //메시지 입력박스 내용 지우기
        function clearTextarea(){
                $('div.input-div textarea').val('');
        }
    
        //메시지 수신
        function receive(data){
            const LR = (data.senderName != myName)? "left" : "right";
            if(LR == "right"){
                appendMessageTag("right", data.senderName, data.message);
            }else{
                appendMessageTag("left", data.senderName, data.message);   //
            }
        }
    
        return{
            'init':init
        };
    
    })();
    
    
    $(function(){                                   //맨 처음 시작:  $(function(){  })
        Chat.init();
    });
    

