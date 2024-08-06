#include "NativeBcryptCppTurboModule.h"
//#import <QuartzCore/QuartzCore.h>



namespace facebook::react {
NativeBcryptCppTurboModule::NativeBcryptCppTurboModule(std::shared_ptr<CallInvoker> jsinvoker): NativeBcryptCppCxxSpec<NativeBcryptCppTurboModule>(std::move(jsinvoker)) {}

jsi::Value NativeBcryptCppTurboModule::generateHash(jsi::Runtime &rt, std::string password, double workload) {
    return jsi::Value::undefined();
}


jsi::Value NativeBcryptCppTurboModule::validatePassword(jsi::Runtime &rt, std::string password, std::string hash) {
    return jsi::Value::undefined();
}
std::string NativeBcryptCppTurboModule::generateHashSync(jsi::Runtime &rt, std::string password, double workload){

    std::string generatedHash = bcrypt::generateHash(password, workload);
    return generatedHash;
}
bool NativeBcryptCppTurboModule::validatePasswordSync(jsi::Runtime &rt, std::string password, std::string hash) {
    return bcrypt::validatePassword(password, hash);
}

}
