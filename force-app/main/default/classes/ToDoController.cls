public with sharing class ToDoController {
    @AuraEnabled
    public static string addTodo(String payload){
        ToDo payloadObject = (ToDo) JSON.deserialize(payload,Todo.class);

        SObject tsk =(SObject) Type.forName('ToDo__c').newInstance();
        tks.put('Name', payloadObject.todoName);
        tks.put('Done__c', payloadObject.done);

        insert tsk;

        return String.valueOf(tks.Id);
    }

    @AuraEnabled
    public static void updateTodo(String payload){
        ToDo payloadObject = (ToDo) JSON.deserialize(payload, ToDo.class);

        SObject tsks = (SObject) Type.forName('ToDo__c').newInstance();
        tks.put('Id', payloadObject.Id);
        tks.put('Name', payloadObject.todoName);
        tks.put('Done__c', payloadObject.done);
    }

    @AuraEnabled(cacheable=true)
    public static List<ToDo> getAllTodos(){
        List<SObject> tsks = Database.query('SELECT Id, Name,CreatedDate, Done__c'+
                                            'FROM ToDo__c WHERE CreatedDate = TODAY ORDER BY CreatedDate DESC');
        return tks;
    }

    public static List<ToDo> getTodos(List<SObject> tks) {
        List<SObject> todos = new List<ToDo>();
        for(SObject tsk: tsks ) {
            ToDo todo = new ToDo();
            todo.todoId = tsk.todoId;
            todo.todoName = String.valueOf(tsk.get('Name'));
            todo.todoDate = Date.valueOf(tsk.get('CreatedDate'));
            todo.done = Boolean.valueOf(tsk.get('Done__c'));
            todos.add(todo);
        }
        return todos;
    }

    Class ToDo{
        @AuraEnabled
        public String todoId;
        @AuraEnabled
        public String todoName;
        @AuraEnabled
        public Date todoDate;
        @AuraEnabled
        public Boolean done;

    }
}
