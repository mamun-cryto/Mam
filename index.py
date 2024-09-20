from aiogram import Bot, Dispatcher, types
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher import FSMContext, State
from aiogram.utils import executor
import random
import json

API_TOKEN = '7193212747:AAGso5pxtwnVSVRTLmOC1BJaXf_9IIefYRI'
bot = Bot(token=API_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(bot, storage=storage)

class Form(StatesGroup):
    math_question = State()
    join_groups = State()
    get_name = State()

# Start command
@dp.message_handler(commands=['start'])
async def start_handler(message: types.Message):
    await message.answer("একটি ম্যাথ প্রশ্ন আসছে।")
    await ask_math_question(message)

# Ask math question
async def ask_math_question(message):
    num1 = random.randint(10, 100)
    num2 = random.randint(10, 100)
    correct_answer = num1 + num2  # বা বিয়োগও করতে পারেন
    await message.answer(f"{num1} + {num2} এর উত্তর দিন:")
    await Form.math_question.set()
    await dp.current_state(user=message.from_user.id).update_data(correct_answer=correct_answer)

@dp.message_handler(state=Form.math_question)
async def check_answer(message: types.Message, state: FSMContext):
    user_data = await state.get_data()
    correct_answer = user_data.get('correct_answer')

    if message.text.isdigit() and int(message.text) == correct_answer:
        await message.answer("সঠিক উত্তর! এখন গ্রুপ এবং চ্যানেল জয়েন করুন।")
        await Form.join_groups.set()
    else:
        await message.answer("সঠিক উত্তর নয়! আবার চেষ্টা করুন।")
        await ask_math_question(message)

@dp.message_handler(state=Form.join_groups)
async def join_groups_handler(message: types.Message, state: FSMContext):
    await message.answer("গ্রুপ/চ্যানেল জয়েন করুন। [Group Link](https://example.com)")
    await message.answer("Join complete হলে /verify কমান্ড দিন।")

@dp.message_handler(commands=['verify'], state=Form.join_groups)
async def verify_handler(message: types.Message, state: FSMContext):
    await Form.get_name.set()
    await message.answer("আপনার নাম দিন:")

@dp.message_handler(state=Form.get_name)
async def save_name_handler(message: types.Message, state: FSMContext):
    name = message.text
    await message.answer(f"ধন্যবাদ, {name}! আপনার রেফার লিংক: https://example.com/referral/{name}")

    await state.finish()

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True
