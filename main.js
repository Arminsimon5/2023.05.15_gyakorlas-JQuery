const base_url = "https://retoolapi.dev/iCFU9A/data";

$(function() {
    listPeople();
    $("#save").click(function () {
        modifyStudent($("#studentId").val());
        torol();
        listPeople();
    });
    

    $("#person-form").submit(function (e) { 
        e.preventDefault();
        const name = $("#name_input").val();
        const email = $("#email_input").val();
        const phone = $("#phone_input").val();
        const birthPlace = $("#place_input").val();
        const person = {
            Name: name,
            Email: email,
            Phone: phone,
            BirthPlace: birthPlace
        }
        $.post(base_url, person,
            function (data, textStatus, jqXHR) {
                if (textStatus === "success") {
                    torol();
                    listPeople();
                }
            },
            "json"
        );
    });
});

function torol() {
    $("#name_input").val("");
    $("#email_input").val("");
    $("#phone_input").val("");
    $("#place_input").val("");
}

function listPeople() {
    $.get(base_url, function(data, textStatus) {
        let html = "";
        data.forEach(student => {
            html += `<tr>
                <td>${student.id}</td>
                <td>${student.Name}</td>
                <td>${student.Email}</td>
                <td>${student.Phone}</td>
                <td>${student.BirthPlace}</td>
                <td>
                <i onclick="readStudent(${student.id})" class="fa fa-edit"></i>
                </td>
                <td>
                <i onclick="deleteStudent(${student.id})" class="fa fa-remove"></i>
                </td>
            </tr>`;
        });
        $("#people-table").html(html);
    },
    "json");
}

function deleteStudent(studentId) {
    $.ajax({
        type: "DELETE",
        url: `${base_url}/${studentId}`,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {
                listPeople();
            }
        }
    });
}

function readStudent(studentId) {
    $.get( base_url + "/" + studentId,
        function (data, textStatus) 
        {
            $("#name_input").val(data.Name);
            $("#email_input").val(data.Email);
            $("#phone_input").val(data.Phone);
            $("#place_input").val(data.BirthPlace);
            $("#studentId").val(data.id)
        },
        "json")
    }

function modifyStudent(studentId) {
    const name = $("#name_input").val();
    const email = $("#email_input").val();
    const phone = $("#phone_input").val();
    const birthPlace = $("#place_input").val();
    const person = {
        Name: name,
        Email: email,
        Phone: phone,
        BirthPlace: birthPlace
    }
    $.ajax({
        
        type: "PUT",
        url: `${base_url}/${studentId}`,
        data: person,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {
                listPeople();
            }
        }
    })
}
