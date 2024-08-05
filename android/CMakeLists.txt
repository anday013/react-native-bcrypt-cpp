cmake_minimum_required(VERSION 3.4.1)
project(BcryptCpp)

set (CMAKE_VERBOSE_MAKEFILE ON)

add_compile_options(
        -fexceptions
        -frtti
        -std=c++17
)

add_library(react-native-bcrypt-cpp            STATIC
            ../cpp/NativeBcryptCppTurboModule.cpp
)

target_include_directories(react-native-bcrypt-cpp
        PUBLIC
        ../cpp
)

target_link_libraries(react-native-bcrypt-cpp
        jsi
        react_nativemodule_core
        react_codegen_RNBcryptCppSpec
)
