import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "لطفا ${path} را وارد کنید",
    notType: "نوع ${path} نامعتبر است",
  },
  string: {
    min: "برای ${path} باید حداقل ${min} نویسه وارد کنید",
    max: "برای ${path} باید حداکثر ${max} نویسه وارد کنید",
    length: "برای ${path} باید دقیقا ${length} نویسه وارد کنید",
  },
  number: {
    min: "برای ${path} باید عددی بزرگتر یا مساوی ${min} وارد کنید",
    max: "برای ${path} باید عددی کوچکتر یا مساوی ${max} وارد کنید",
    integer: "برای ${path} فقط عدد صحیح وارد کنید",
    negative: "برای ${path} فقط عدد منفی وارد کنید",
    positive: "برای ${path} فقط عدد مثبت وارد کنید",
  },
});

export default yup;
