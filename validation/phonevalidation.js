import * as Yup from "yup";

export default Yup.object().shape({
  phone: Yup.number()
    .required("پر کردن فیلد الزامی می باشد.")
    .typeError("تنها وارد کردن اعداد مجاز می باشد.")
    .positive("شماره موبایل نمی تواند یک عدد منفی باشد.")
    .test("len", "شماره موبایل وارد شده صحیح نیست.", val =>
      new RegExp("^(0)?9\\d{9}$").test(val)
    )
});
