document.addEventListener("DOMContentLoaded", function () {
    var inputElement = document.querySelector("#input_chat");
    var listMessage = document.querySelector("#list_message");

    inputElement.addEventListener("change", (e) => {
        // tạo phần tử li
        var li = document.createElement("li");
        li.classList.add("clearfix");

        // tạo phần tử div.message-data.text-right
        var div1 = document.createElement("div");
        div1.classList.add("message-data", "text-right");

        // tạo phần tử span.message-data-time
        var span = document.createElement("span");
        span.classList.add("message-data-time");
        span.textContent = "10:10 AM, Today";

        // thêm span vào div1
        div1.appendChild(span);

        // tạo phần tử img 
        var img = document.createElement("img");
        img.setAttribute("src", "https://bootdey.com/img/Content/avatar/avatar7.png");
        img.setAttribute("alt", "avatar");

        // thêm img vào div1
        div1.appendChild(img);

        // thêm div1 vào li
        li.appendChild(div1);

        // tạo phần tử div.message.other-message.float-right
        var div2 = document.createElement("div");
        div2.classList.add("message", "other-message", "float-right");
        div2.textContent = e.target.value;

        // thêm div2 vào li
        li.appendChild(div2);

        // thêm li vào ul#message-list
        listMessage.appendChild(li);


        const endpoint = 'https://api.openai.com/v1/completions';
        const prompt = e.target.value;
        const model = 'text-davinci-002';
        const apiKey = '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';

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey,
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 50,
                n: 1,
                stop: '\n',
                model: model,
            }),
        };

        fetch(endpoint, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.choices[0].text);
                const li = document.createElement('li');
                li.classList.add('clearfix');

                const messageData = document.createElement('div');
                messageData.classList.add('message-data');

                const messageDataTime = document.createElement('span');
                messageDataTime.classList.add('message-data-time');
                messageDataTime.textContent = '10:15 AM, Today';

                messageData.appendChild(messageDataTime);
                li.appendChild(messageData);

                const message = document.createElement('div');
                message.classList.add('message');
                message.classList.add('my-message');
                message.textContent = 'Project has been already finished and I have results to show you.';

                li.appendChild(message);
            })
            .catch(error => {
                console.error('There was a problem with the GPT-3.5 API request:', error);
            });
    })
}, false);