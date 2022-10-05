$(document).ready(function () {

    $('#Register_Student').click(Register_Student);

    $('#All_Student').click(All_Student);

    $('#Create_Student_Model').click(Create_Student_Model);

});



var collection = Backbone.Collection.extend();
var Student_collection = new collection([]);

var Student = Backbone.Model.extend();


function Create_Student_Model() {
    var Sname = document.getElementById("Student_Name").value;
    var Fname = document.getElementById("Father_Name").value;
    var Mname = document.getElementById("Mother_Name").value;
    var gender = $("input[type='radio'][name=gender]:checked").val();
    var dob = document.getElementById("dob").value;

    var stud = new Student();
    stud.set({
        "Student_Name": Sname,
        "Father_Name": Fname,
        "Mother_Name": Mname,
        "Gender": gender,
        "dob": dob,
    })

    Student_collection.add(stud);
    document.getElementById("msg").innerHTML="Student added Successfully";
}

var view = Backbone.View.extend({
    render: function () {
        display(this.collection);
    }
});


function Create_view() {

    var Student_view = new view({
        collection: Student_collection,
    });

    Student_view.render();

}

function display(Student_collection) {
    document.getElementById("tbody").innerHTML = "";

    Student_collection.forEach(function (stud, index) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = index + 1;
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = stud.get("Student_Name");
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerHTML = stud.get("Father_Name");
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.innerHTML = stud.get("Mother_Name");
        tr.appendChild(td4);

        var td5 = document.createElement("td");
        td5.innerHTML = stud.get("Gender");
        tr.appendChild(td5);

        var td6 = document.createElement("td");
        td6.innerHTML = stud.get("dob");
        tr.appendChild(td6);

        var button1 = document.createElement("button");
        button1.innerHTML = ("Update");
        button1.setAttribute("onclick", "update(" + index + ")");
        tr.appendChild(button1);

        var button2 = document.createElement("button");
        button2.innerHTML = ("Delete");
        button2.setAttribute("onclick", "dlt(" + index + ")");
        button2.style.backgroundColor = "#c64343";
        tr.appendChild(button2);

        document.getElementById("tbody").appendChild(tr);
    });
}

function Register_Student() {
    document.getElementById("container1").style.display = "block";
    document.getElementById("container2").style.display = "none";
    document.getElementById("msg").style.display="block"; 
}

function All_Student() {
    document.getElementById("container1").style.display = "none";
    document.getElementById("container2").style.display = "block";
    document.getElementById("msg").style.display="none";
    Create_view();
}

function update(id) {
    var std = Student_collection.at(id);

    Register_Student();
    document.getElementById("Student_Name").value = std.get("Student_Name");
    document.getElementById("Father_Name").value = std.get("Father_Name");
    document.getElementById("Mother_Name").value = std.get("Mother_Name");
    document.getElementById("dob").value = std.get("dob");

    document.getElementById("Create_Student_Model").style.display="none";
    document.getElementById("msg").style.display="block";

    var btn4=document.getElementById("update_student");
    btn4.style.display="inline";
    btn4.setAttribute("onclick" ,"update_student("+id+")");
    btn4.style.backgroundColor="green";
 
}

function update_student(id){
    document.getElementById("Create_Student_Model").style.display="inline";
    document.getElementById("update_student").style.display="none";
    document.getElementById("msg").innerHTML="Student No. "+(id+1)+" updated Successfully";

    var Sname = document.getElementById("Student_Name").value;
    var Fname = document.getElementById("Father_Name").value;
    var Mname = document.getElementById("Mother_Name").value;
    var gender = $("input[type='radio'][name=gender]:checked").val();
    var dob = document.getElementById("dob").value;

    var std = Student_collection.at(id);
    std.set({
        "Student_Name": Sname,
        "Father_Name": Fname,
        "Mother_Name": Mname,
        "Gender": gender,
        "dob": dob,
    });
    std.save();
}

function dlt(id) {
    Student_collection.remove(Student_collection.at(id));
    All_Student();
}