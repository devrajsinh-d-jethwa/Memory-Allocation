
document.addEventListener("DOMContentLoaded",()=>{
    const algorithm = localStorage.getItem ("algorithm");
    const partition = localStorage.getItem("partition");

    localStorage.removeItem("algorithm");
    localStorage.removeItem("partition");
    document.title = `${algorithm} with ${partition} partition`
    document.getElementById("head").innerText = `${algorithm} with ${partition}`;

    const memory = [50,150,300,350,600];
    const memoryStauts = [];
    for(let i=0;i<memory.length;i++)
    {
        memoryStauts.push(false);
    }

    let sum = 0;
    let count=0;
    let wasteMemory = 0;
    let largestHole = 0;
    let smallestHole = 0;

    const process = [300,25,125,50];
    const processNumber =  [];
    for(let i=0;i<process.length;i++)
    {
        processNumber.push(i+1);
    }
    //const memory = [100,20,80,30,40];
    //const process = [80,60,25,15,30];
    const container = document.getElementById("container");
    const container1 = document.getElementById("container1");
    const container2 = document.getElementById("container2");
    const container3 = document.getElementById("container3");

    for(let i=0;i<memory.length;i++)
    {
        sum += memory[i];
    }
    function makeBlocks()
    {
        memory.forEach((value,i)=>{
            setTimeout(()=>{
                const div = document.createElement("div");
                const width = (value / sum) * 100;
                div.style.width =  `${width}%`;
                div.style.height = "100px";
                div.style.background = getRandomColor();
                container.appendChild(div);
            },(i+1) * 1000);
        });
    }
    function writeSpace()
    {
        memory.forEach((value,i)=>{
            setTimeout(()=>{
                const div = document.createElement("div");
                const width = (value / sum) * 100;
                div.style.width =  `${width}%`;
                div.style.height = "20px";
                div.textContent = `${value} KB`
                container1.appendChild(div);
            },(i+1) * 1000);
        });
    }

    //Random Color Generator
    function getRandomColor()
    {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for(let i=0;i<6;i++)
        {
            color += letters[Math.floor(Math.random()*16)];
        }
        return color;
    } 

    function processes()
    {
        for(let i=0;i<process.length;i++)
        {
            const div = document.createElement("div");
            div.textContent = `${processNumber[i]} : ${process[i]} KB`;
            container2.appendChild(div);
        }
    }
    makeBlocks();
    writeSpace();
    processes();

    //First Fit Or Next Fit with Varibale Parition or Fixed Partition
    let index;
    function firstOrnextFit(key,value,i)
    {
        if(i === 0 || algorithm === "First Fit")
            index=0;
        for(let i=index;i<memory.length;i++)
        {
            let key1 = memory[i];
            let value1 = memoryStauts[i];
            if(key <= key1 && value1 === false)
            {
                alert(`process : ${key} , memory : ${key1} , Remaining : ${key1 - key} , Process Number : ${value}`);
                if(key === key1 || partition === "Fixed Size")
                {
                    const div = container.children[i];
                    div.textContent = value;
                    wasteMemory += key1 - key;
                    memoryStauts[i] = true;
                    index = i;
                    return;
                }
                else
                {
                    deleteElements(index,key1,key);
                    makeNewBlocks(index,key,key1,value);
                    index = i;
                    return;
                }
            }
            index++;
        }
    }

    function deleteElements(index,key1,key)
    {
        memory.splice(index,1,key,(key1-key));
        memoryStauts.splice(index,1,true,false);

    }
    
    function makeNewBlocks(index,key,key1,value)
    {
        let width1 = (key / sum) * 100;
        let width2 = ((key1-key) / sum) * 100;
        let diff = key1 - key;

        const div = container.children[index];
        div.style.width = `${width1}%`;
        div.textContent = value;

        const newDiv = document.createElement("div");
        newDiv.style.width = `${width2}%`;
        newDiv.style.backgroundColor = getRandomColor();
        container.insertBefore(newDiv,div.nextSibling);

        const divText = container1.children[index];
        divText.style.width = `${width1}%`;
        divText.textContent = `${key}KB`;

        const newDivText = document.createElement("div");
        newDivText.style.width = `${width2}%`;
        newDivText.textContent = `${diff}KB`;
        newDivText.style.transform = "rotate(90deg)";
        newDivText.style.padding = "5px 7px";
        container1.insertBefore(newDivText,divText.nextSibling);
    }

    //Best Fit and Worst Fit  with Fixed Partition or Variable Partition
    function bestOrworstFit(key,value)
    {
        let borwfix = [];
        let index=-1;
        for(let i=0;i<memory.length;i++)
        {
            let key1 = memory[i];
            let value1 = memoryStauts[i];
            if(key <= key1 && value1 === false)
                borwfix.push(key1);
        }
        if(borwfix.length === 0)
            return;

        let final = (algorithm === "Best Fit") ? Math.min(...borwfix) : Math.max(...borwfix);

        for(let i=0;i<memory.length;i++)
        {
            if(memory[i] === final && !memoryStauts[i])
            {
                index = i;
                break;
            }
        }

        if (index === -1)
            return;

        if (key === final || partition === "Fixed Size")
         {
            const block = container.children[index];
            block.innerText = value;
            wasteMemory += memory[index] - key;
            alert(`process : ${key}  memory : ${memory[index]} process number : ${value}`);
            memoryStauts[index] = true;
        } 
        else 
        {
            let temp = memory[index];
            alert(`process : ${key} , memory : ${memory[index]} , Remaining : ${memory[index] - key} , Process Number : ${value}`);
            deleteElements(index, memory[index], key);
            makeNewBlocks(index, key, temp, value);
        }
    }

    //Logic for getting necessary values
    const giveInfo = ()=>{
        for(let i=0;i<memory.length;i++)
        {
            let key = memory[i];
            let value = memoryStauts[i];
            if(value === false)
            {
                wasteMemory += key;
                if(smallestHole === 0 && largestHole === 0)
                {
                    largestHole = key;
                    smallestHole = key;
                }
                if(key >= largestHole)
                    largestHole = key;
                if(key <= smallestHole)
                    smallestHole = key;
            }
            else 
                count++;
        }
        const div = document.createElement("div");
        div.textContent = `Total Memory Wastage : ${wasteMemory}`;
        container3.appendChild(div);

        const div1 = document.createElement("div");
        div1.textContent = `Largest Hole : ${largestHole}`
        container3.appendChild(div1);

        const div2 = document.createElement("div");
        div2.textContent = `Smallest Hole : ${smallestHole}`
        container3.appendChild(div2);

        const div3 = document.createElement("div");
        div3.textContent = `Total number of processes that is not allocated : ${Math.min(process.length,memory.length) - count}`;
        container3.appendChild(div3);
    }

    for(let i=0;i<Math.min(process.length,memory.length);i++)
    {
        setTimeout(()=>{
            if(algorithm === "First Fit" || algorithm === "Next Fit")
                firstOrnextFit(process[i],processNumber[i],i);
            else
                bestOrworstFit(process[i],processNumber[i]);
        },9000);
    }

    setTimeout(()=>{
        giveInfo();
    },12000);

});