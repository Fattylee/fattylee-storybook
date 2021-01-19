import $ from "jquery";
import modalBox from "../helpers/modalBox";
import loading from "../helpers/loading";
import { v1 } from "uuid";
const uuid = v1;

export default () => {
  // submit event for each delete account
  $(".delete-profile").submit(function (e) {
    e.preventDefault();
    const dynamicId = "delete-account-" + uuid();

    const launcherSelector = "#" + dynamicId + "y";

    // add dynamicId to launcherButton
    $(e.target).attr("id", dynamicId + "y");

    const actionUrl = $(launcherSelector).attr("action");

    // mount modalBox
    modalBox({
      modalID: dynamicId,
      actionButton: `
     <form action="${actionUrl}" method="post">
    <button type="submit" class="btn btn-block btn-danger">Delete Account</button>
  </form>
    `,
      launcherSelector,
      launcherClasses: "btn-block btn-danger",
      title: "Delete account",
      body: "Are you sure you want to delete your account?",
      launcherText: "Delete account",
    }); // end DELETE account modalBox

    // triggered modalBox click
    $(`[data-target="#${dynamicId}"]`).click();

    const deleteBtnSelector = `[action="${actionUrl}"] button`;

    // add loading effect
    $(deleteBtnSelector).on("click", function (e) {
      loading(deleteBtnSelector, "Deleting...");
      $(this).parent().submit();
    });
  }); // end submit event for each delete account
};
