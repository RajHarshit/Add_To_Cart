import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-c69da-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingListHr = document.getElementById("shopping-list")

addButton.addEventListener("click", function() {
    let inputValue = inputField.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputField()
})


onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingList()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            AppendItemToShoppingList(currentItem)
        }    
    } else {
        shoppingListHr.innerHTML = "No items here... yet"
    }
})



function clearShoppingList() {
    shoppingListHr.innerHTML = ""
}


function clearInputField() {
    inputField.value = ""
}


function AppendItemToShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListHr.append(newEl)
}

