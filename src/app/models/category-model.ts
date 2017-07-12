import { TodoItem } from './todo-model';

export class Category {
    title: string;
    todos: Array<TodoItem> = [];
    style: string;
    
    constructor(categoryTitle: string, todoArray: Array<TodoItem>, colorStyle: string){
        this.title = categoryTitle;
        this.todos = todoArray;
        this.style = colorStyle;
    }
}

export class TodoService {
    getCategories():Array<Category>{
        return categories.map(c=>new Category(c.title, c.todos, c.style));
    }
    
    getCategoriesNames(): Array<string>{
        var categoriesNames: Array<string>= [];
        for(var i=0; i< categories.length; i++){
            categoriesNames[i] = categories[i].title;
        }
        return categoriesNames;
    }
    
    getPieChartData(): number[] {
        var todosCount =0;
        var dataCount:number[]=[0,0,0,0,0,0,0,0];
        for(var i=0;i<categories.length;i++) {
            var curTodos:Array<TodoItem> = categories[i].todos;
            var curCount=0;
            for(var j=0;j<curTodos.length;j++){                
                if(curTodos[j].isDone){
                    curCount++;
                } 
                else {
                    todosCount++;
                }
            }
            dataCount[i+1]=curCount;
        }
        dataCount[0]=todosCount;
        return dataCount;
    }
    
    getLineChartData(): any[] {
        var dataTime:any[]=[];
        var dataWithDateAndCount: any[] = [];
        var k=0;
        for(var i=0;i<categories.length;i++) {
            var curTodos:Array<TodoItem> = categories[i].todos;
            for(var j=0;j<curTodos.length;j++) {
                if(curTodos[j].isDone) {
                    dataTime[k++] = new Date(curTodos[j].doneDate);
                }
            }
        }
        dataTime.sort(function(a,b){
            return a-b;
        });
        
        for(var i=0;i<dataTime.length;i++){
           dataWithDateAndCount[i] = [Date.UTC(dataTime[i].getUTCFullYear(), dataTime[i].getUTCMonth(), dataTime[i].getUTCDate()), i+1];
        }
        return dataWithDateAndCount;
    }
}

var categories = null;
var savedData = window.localStorage.getItem("SavedAtomIEPData");
if(savedData != null)
    {
        categories = JSON.parse(savedData); 
    }
else
    {
        categories = 
  [
    {
        "title" : "General",
        "todos" : [
            {
                "title" : "Transition IEP age 14-Legal requirement",
                "details" : "Start to plan your transition from Special Education Services to Adult Life.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Write Transition goals in IEP",
                "details" : "This application will help you and the rest of your IEP team write and plan to complete your goals to help you meet your post High School plans.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Discuss and plan a timeline for High School attendance",
                "details" : "Place a timeline on your transition goals and plans to complete High School. Your goals will fit  your strengths, skills, and interests. Legally, you will complete High School by age 21, but you may complete it before age 21!",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Look into timelines for adult services and waitlists",
                "details" : "Adult services within the community often have long waitlists. It is best to look into this early to help with planning adult life post High School. This application will help you create goals to apply for and plan for adult services that fit your needs.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
        ],
        "style" : "general"
    },
    {
        "title" : "Work",
        "todos" : [
            {
                "title" : "Vocational training built into IEP goals",
                "details" : "Plan out training for your skills, strengths, and interests to prepare you for work.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Schedule Vocational options",
                "details" : "Make a list of options that fit your skills, strengths, and interests.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Explore Government assistance options",
                "details" : "Government assistance options can help you out financially and medically.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Explore and apply for Social Security/SSI/etc",
                "details" : "Sources such as social security and Supplemental Security Income can help plan for financial situations such as retirement, disabilities, and little or no income.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
        ],
        "style" : "work"
    },
    {
        "title" : "Education",
        "todos" : [
            {
                "title" : "Attend IEP meeting anually",
                "details" : "Plan and review your progress! Meet annually with your IEP team and discuss progress on transition and other IEP goals adjust IEP and goals where necessary. Plan for your IEP meetings by setting a “due date” within the application. Change your “due date” following each meeting.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Schedule vocational education classes",
                "details" : "Schedule specific classes that will further advance your vocational skills!",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Explore possible continuing education options",
                "details" : "Would you like to continue your education? Look into further possibilities!",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
        ],
        "style" : "education"
    },
    {
        "title" : "Medical",
        "todos" : [
            {
                "title" : "Ensure plan for medical/health coverage",
                "details" : "Be sure you are medically covered! Look into options for government assistance. See if government assistance is a possibility for you.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
        ],
        "style" : "medical"
    },
    {
        "title" : "Home/Living",
        "todos" : [
            {
                "title" : "IEP/Home Goals for living/adaptive independent living skills",
                "details" : "Understand the skills needed to live on your own.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Budgeting and Finance education",
                "details" : "Learn how to balance your finances for food and living.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Explore and discuss options for living after graduation",
                "details" : "Find reasonable options for housing and living situations. Look into living options and support.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
        ],
        "style" : "homeAndLiving"
    },
    {
        "title" : "Social/Recreation",
        "todos" : [
            {
                "title" : "Explore recreation and leisure interests",
                "details" : "What do you like to do for fun? Let’s pursue those interests!",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Explore recreation and leisure community options",
                "details" : "Join a group that will explore the same interests as you!",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
        ],
        "style" : "socialAndRecreation"
    },
    {
        "title" : "Parent/Guardianship",
        "todos" : [
            {
                "title" : "Explore respite and community supports for parents",
                "details" : "Find support for your primary care, guardians and/or parents!",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Explore guardianship options (before 18 Y/O)",
                "details" : "Sometimes it is in our best interest to have our parents be our legal guardians into adult life. Look into options for guardianship and see what is the best fit for you and your family. Guardians may help you succeed!",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Determine what legal guardianship is in the best interest for student/child",
                "details" : "Explore legal guardianship options that will best help you succeed!",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Establish guardianship if necessary (before 18 Y/O)",
                "details" : "Sometimes it is in the best interest of an adolescent to have their parents or guardians continue guardianship when they are 18 and older. See if this is a good option for you.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Establish necessary support services following high school",
                "details" : "What other support services will help you be the best you?",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
            {
                "title" : "Attend every annual IEP meeting",
                "details" : "Plan and review your progress! Change the date annually and plan for your next IEP meeting.",
                "isDone" : false,
                "created" : new Date().toJSON(),
                "priority" : null,
                "dueBy" : null,
            },
        ],
        "style" : "parentOrGuardianship"
    },
];
        window.localStorage.setItem("SavedAtomIEPData", JSON.stringify(categories));
    }