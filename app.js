
var bugetController = (function(){
    var Income = function(ID,desc,val){
            this.ID = ID;
            this.desc = desc;
            this.val = val;
     }
    
    var Expence = function(ID, desc, val){
        this.ID = ID;
        this.desc = desc;
        this.val = val;
    }

    var data = {
        allItems:{
        exp:[],
        inc:[]
        },
        totalItems:{
            exp:0,
            inc:0
        }
    }
    return {
    addItem : function (type, desc, val){
         var newItem, ID; 
        if(data.allItems[type].length > 0){
         ID = data.allItems[type][data.allItems[type].length-1].id +1 ;// Selecting the last Id and incrementing by one and assignnig to ID
        }else{
         ID = 0;
        }
        if (type === 'exp'){
         newItem = new Expence(ID, desc, val);
           }
        else if (type === 'inc'){
         newItem = new Income(ID, desc, val);
        }
        data.allItems[type].push(newItem);
        
        return newItem;
      }
    };
    
})
();

var UIController = (function() {
    // Good datastructure aggrigating all UI DOM in one object
    var DOMstrings = {
        inputType:'.add__type', // assigning HTML DOM to Variable
        inputDesc:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn',
        income_list:'.income__list',
        expence_list:'.expenses__list'
              }
   // aggrigating all the DOM values and returing as public
                return {
            getValue : function (){
                     return {
                type:document.querySelector(DOMstrings.inputType).value,
                desc:document.querySelector(DOMstrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
                };
              },
              addListItem: function (obj, type){
                  var html, newHtml, element;
                // Create HTML string with placeholder text
             if (type === 'inc'){
                element= DOMstrings.income_list;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
              }
             else if (type === 'exp'){
                element= DOMstrings.expence_list;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
             }
             // Replace the placeholder text with some actual data
             newHtml = html.replace('%id%', obj.ID);
             newHtml = newHtml.replace('%desc%',obj.desc);
             newHtml = newHtml.replace('%value%',obj.val);

             // Insert the HTML into the DOM
             
             document.querySelector(element).insertAdjacentHTML("beforeend",newHtml);
              },
            
               //});
               clearfeilds : function(){
                var fields,arrFields;
                fields = document.querySelectorAll(DOMstrings.inputDesc + ',' + DOMstrings.inputValue);
                arrFields = Array.prototype.slice.call(fields);

                arrFields.forEach(function(current, index, array) {
                  current.value = '';
                  });
            },
      //Making DOMstrings public 
       getDOMstrings : function (){
        return DOMstrings;      
         }        
    };

})
();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

        
        var setupEventhandler = function (){
            var DOM = UICtrl.getDOMstrings();
            document.querySelector(DOM.inputBtn).addEventListener('click', ctrlItem);
            document.addEventListener('keypress', function(event){
               if (event.keyCode===13 ){
                   ctrlItem();

            }
         });
        }

        var ctrlItem = function (){
        var input, newItem;
        //1. get input value
        input = UICtrl.getValue();
        // if else condition to check if the there is input description or value in the field
        if (input.desc !== "" && !isNaN(input.value) && input.value > 0){
        //2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.desc, input.value);
        //3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        //console.log("It works")
        //4. Clear filds 
        UICtrl.clearfeilds();

        }
    }

        return{
              init : function (){
              console.log('The application has started.');
             setupEventhandler ();
           }
        };

    //
 
})(bugetController, UIController);

controller.init();