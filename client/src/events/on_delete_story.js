import $ from "jquery";
import modalBox from "../helpers/modalBox";
import loading from "../helpers/loading";
import { v1 } from "uuid";

const uuid = v1;

export default () => {
  // submit event for each delete story
  $(".delete-stories").submit(function (e) {
    e.preventDefault();
    console.log("working");
    const dynamicId = "delete-story-" + uuid();

    const launcherSelector = "#" + dynamicId + "y";

    // add dynamicId to launcherButton
    $(e.target).attr("id", dynamicId + "y");

    const actionUrl = $(launcherSelector).attr("action");

    // mount modalBox
    modalBox({
      modalID: dynamicId,
      actionButton: `
     <form action="${actionUrl}" method="post">
    <button type="submit" class="btn btn-block btn-danger">Delete story</button>
  </form>
    `,
      launcherSelector,
      launcherClasses: "btn-block",
      title: "Delete  story",
      body: `Are you sure you want to delete this story "<strong>${$(
        launcherSelector
      )
        .closest(".card-footer")
        .closest(".get-title")
        .find(".card-title")
        .text()}</strong>"?`,
      launcherText: "Delete story",
    }); // end DELETE story modalBox

    // triggered modalBox click
    $(`[data-target="#${dynamicId}"]`)[0].click();

    const deleteBtnSelector = `[action="${actionUrl}"] button`;

    // add loading effect
    $(deleteBtnSelector).on("click", function (e) {
      loading(deleteBtnSelector, "Deleting...");
      $(this).parent().submit();
    });
  }); // end submit event for each delete story
};
