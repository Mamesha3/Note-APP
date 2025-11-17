const taskcontainer = document.querySelector('#notes__task')
const container = document.querySelector('.container')
const addTaskContainer = document.querySelector('.containe_task_add')
const taskaddBtn = document.querySelector('#add_note_btn')
const saveBtn = document.querySelector('#save_btn')
const titleInp = document.querySelector('#input_title')
const content = document.querySelector('#note__content')
const cancel = document.querySelector('#cancel')
editingLi = null
renderSaveData()




function dltBtnf(ul, h32, p2, ls) {
    // create ul for delete and edit btn

    const delt = document.createElement('li')
    delt.className = 'dlelete'
    delt.textContent = 'Delete'

    const edit = document.createElement('li')
    edit.className = 'editCont'
    edit.textContent = 'Edit'
    editDelBtn(edit, delt, h32, p2, ls)

    ul.append(edit, delt)
}

function editDelBtn(edit, dlt, h3s, ps, li) {
    edit.addEventListener('click', ()=> {
        editingLi = li

       container.classList.add('shade')
       addTaskContainer.style.display = 'block'

       titleInp.value = h3s.textContent
       content.value = ps.textContent
      
    })
    dlt.addEventListener('click', () => {
       document.querySelector('.delte_request').classList.toggle('displaythis')
       container.classList.toggle('shade')
    })

    document.querySelector('#dont').addEventListener('click', () => {
        document.querySelector('.delte_request').classList.remove('displaythis')
        container.classList.remove('shade')
    })

    
}

function allDltB(button, ul, dlBack) {
    button.addEventListener('click', () => {      
        ul.classList.toggle('ulop')
        dlBack.classList.toggle('backgroundClick')  
    })
}

function creatNoteBox(titleInput, textarea, addTime, checked) {
    // creat elements
    const li = document.createElement('li')
    li.classList = 'old'
    const divTitle = document.createElement('div')
    const h3 = document.createElement('h3')
    const button = document.createElement('button')
    const divDate = document.createElement('div')
    const p = document.createElement('p')
    const ptype = document.createElement('p')
    const h3Type = document.createElement('h3')
    const a = document.createElement('a')
    const dlBack = document.createElement('div')
    dlBack.className = 'background'
    const ul = document.createElement('ul')
    ul.className = 'dltOption'

    // give them class then append them
    divTitle.className = 'title__dltbtn'
    h3.className = 'title'
    h3.textContent = titleInput
    button.id = 'dlt_btn'
    button.innerHTML = '<i class="fa-solid fa-ellipsis"></i>'
    
    allDltB(button, ul, dlBack)

    divTitle.append(ul, h3, button)
    dltBtnf(ul, h3, p, li)

    p.id = 'note_text'
    p.textContent = textarea
    p.classList.add('note_text')

    divDate.className = 'date-type'
    h3Type.id = 'type'
    h3Type.innerHTML = checked
    ptype.id = 'date_of_note'
    ptype.textContent = addTime
    checkedInpStyle(h3Type, h3Type.textContent)

    divDate.append(h3Type, ptype)

    a.id = 'show_more_less'
    a.textContent = 'ShowMore'
    a.addEventListener('click', () => {
        if (p.classList.toggle('note_text')) {
            p.classList.add('note_text')
            a.textContent = 'ShowMore'
        }else {
            a.textContent = 'ShowLess'
            p.classList.remove('note_text')
        }
    })

    // append all
    li.append(dlBack, divTitle, p, a, divDate)
    taskcontainer.appendChild(li)
}

function checkedInpStyle(h3Type, tagText) {
    let t = tagText.toLowerCase()
    if (t.includes('work')) {
       h3Type.classList.add('works')
    }else if (t.includes('personal')) {
        h3Type.classList.add('personal')
    }else if (t.includes('ideas')) {
        h3Type.classList.add('ideas')
    }else if (t.includes('reminder')) {
        h3Type.classList.add('reminder')
    }
}


function checkedInp() {
     const selected = document.querySelector('input[name="radio"]:checked')
     if (!selected) {
        return null
     }
     let label = document.querySelector(`label[for="${selected.id}"]`)

     return label.innerHTML
}

// for drop down select event
const selection = document.querySelector('select')
selection.addEventListener('change', ()=> {
    let selectValue = selection.options[selection.selectedIndex].text
    let lists = taskcontainer.querySelectorAll('li')
    lists.forEach(text => {
        let cont = text.innerHTML
        if (cont.includes(selectValue)) {
           text.style.display = 'block'
        }else{
            text.style.display = 'none'
        }
        if (selectValue === 'All notes') {
            text.style.display = 'block'
        }
    })
     
})

// for search input functionality
function searchNote() {
   const serInp = document.querySelector('#search-input').value.toLowerCase()
   const typeText = taskcontainer.querySelectorAll('li')

   typeText.forEach(text => {
      let conts = text.innerHTML.toLowerCase()

      if (conts.includes(serInp)) {
        text.style.display = 'block'
      }else {
        text.style.display = 'none'
      }
      if(serInp === '') {
         text.style.display = 'block'
      }
   })
}
document.querySelector('#search_btn').addEventListener('click', searchNote)
document.querySelector('#search-input').addEventListener('input', searchNote)
// close here our search  events


// event listners here
taskaddBtn.addEventListener('click', () => {
   titleInp.value = ''
   content.value = ''
   container.classList.add('shade')
   addTaskContainer.style.display = 'block'
})

saveBtn.addEventListener('click', () => {
    let ttlInp = titleInp.value
    let contInp = content.value
    let checkedInput = checkedInp()
   let time = new Date()
   let getTime = `${String(time.getDate() + 1).padStart(2, '0')}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(time.getFullYear() + 1).padStart(2, '0')}  ${String(time.getHours() + 1).padStart(2, '0')}:${String(time.getMinutes() + 1).padStart(2, '0')}` 
   
   if (!ttlInp || !contInp) {
    alert('please fill some note')
    return
   }
    container.classList.remove('shade')
    addTaskContainer.style.display = 'none'
   
   if (editingLi) {
      editingLi.querySelector('.title').textContent = ttlInp
      editingLi.querySelector('#note_text').textContent = contInp
      editingLi.querySelector('#type').innerHTML = checkedInput
      saveData()
      editingLi = null
      return
    }
    creatNoteBox(ttlInp, contInp, getTime, checkedInput)
    saveData()
})

cancel.addEventListener('click', () => {
    container.classList.remove('shade')
    addTaskContainer.style.display = 'none'
})

// local storage feature
function saveData() {
    let task = []
    taskcontainer.querySelectorAll('li').forEach(li => {
       let title = li.querySelector('.title').textContent
       let text = li.querySelector('#note_text').textContent
       let date = li.querySelector('#date_of_note').textContent
       let check = li.querySelector('#type').innerHTML

       task.push({ title, text, date, check })
    })
    localStorage.setItem('listItem', JSON.stringify(task))
}

function renderSaveData() {
    let tasks = JSON.parse(localStorage.getItem('listItem')) || []
    tasks.forEach(task => {
        creatNoteBox(task.title, task.text, task.date, task.check)
    })
}
