/* 
১. Price সঠিক ভাবে আসছে কিনা চেক করে দেখেন। যেই useEffect এর মধ্যে payment intent এর api কল করা হবে সেখানে pricing information আসছে কিনা সেটা নিশ্চিত হয়ে কল করা যেতে পারে।
Ex: if(price){
// call the intent api with the price
}
৩। অনেকেই পেমেন্ট করার জন্য অর্ডার বা বুকিং ইতাদি এর ডিটেইলস যেখানে প্রাইস এর ইনফরমেশন গুলো থাকে সেটা পুরপুরি লোড হওয়ার আগেই payment intent এর api টা কল করে দেয় যার ফলে payment intent api এর payload এ pricing information গুলো যায়না সঠিক ভাবে।
৩। অনেকেই pricing information টা স্ট্রিং আকারে আবার অনেকে সরাসরি অবজেক্ট টাই পাস করে দেয় backend এ payment intent creation এর টাইমে।
4. অনেকে stripe secret টা ঠিকভাবে backend এ stripe require করার সময় পাস করেনা যার ফলেও এই সমস্যা টা হতে পারে।

*/