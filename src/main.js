class Blog {
    constructor(){
        this.setInitVariables();
        this.registerEvents();
        this.likedSet = new Set();
    }

    setInitVariables(){
        this.blogList = document.querySelector(".blogList > ul");
    }

    registerEvents(){
        const startBtn = document.querySelector(".start");
        const dataURL = "/data/data.json";

        var data="";
        startBtn.addEventListener("click",()=>{
            this.setInitData(dataURL)
        })

        this.blogList.addEventListener("click",(evt)=>{
            const targetClassName = evt.target.className
            const postTitle = evt.target.previousElementSibling.textContent;
            //className이 like면 내 찜 목록에 새로운 블로그 제목을 추가.
            if(targetClassName !== 'like' && targetClassName !=='unlike') return;

            //찜 취소를 클릭한 겨우 찜하기로 변경하고 찜목록을 제거하고 찜목록 뷰를 렌더링한다
            if(targetClassName==="unlike"){
                evt.target.className="like"
                evt.target.innerText="찜하기"
                this.likedSet.delete(postTitle)
            }else{
                //찜 된 목록(div)의 클래스를 unlike로 변경
                evt.target.className = "unlike"
                evt.target.innerText = "[찜취소]"
                //찜 목록의 추가
                this.likedSet.add(postTitle)
            }
            //내찜목록뷰에 추가
            this.UpdateLikedList()
        })
    }

    UpdateLikedList(){
        const ul = document.querySelector(".like-list > ul")
        let likeSum = "";
        //li태그에 찜리스트를 넣고 한번에 innerhtml을 사용한다.
        this.likedSet.forEach(v=>{
            likeSum+=`<li>${v}</li>`;
        })
        ul.innerHTML = likeSum
    }

    setInitData(dataURL){
        this.getData(dataURL,this.insertPosts.bind(this))
    }

    getData(dataURL,fn){
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load",()=>{
            const list = JSON.parse(oReq.responseText)
            fn(list)
        })
        oReq.open('GET',dataURL);
        oReq.send();
    }

    insertPosts(list){
        var data="";
        list.body.forEach((v)=>{
            data += `<li>
                <a href="${v.link}">${v.title}</a>
                <span class="like">[찜하기]</span>
            </li>`;
        })
        this.blogList.innerHTML = data
    }
}

export default Blog