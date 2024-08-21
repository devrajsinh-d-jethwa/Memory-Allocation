document.getElementById("algo").addEventListener("focus",(e)=>e.target.value = null);
document.getElementById("part").addEventListener("focus",(e)=>e.target.value = null);
document.getElementById("submit").addEventListener("click",()=>{
    const algorithm = document.getElementById("algo").value;
    const partition = document.getElementById("part").value;

    if(!algorithm || !partition)
    {
        alert("Please Enter all the values first!");
        return;
    }
    if(localStorage.getItem("algorithm") !== null)
        localStorage.removeItem("algorithm");
    localStorage.setItem("algorithm",algorithm);

    if(localStorage.getItem("patition") !== null)
        localStorage.removeItemItem("partition");
    localStorage.setItem("partition",partition);

    window.location.href = "/memory-allocation-display";    
})