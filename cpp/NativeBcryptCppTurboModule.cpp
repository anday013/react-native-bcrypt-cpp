#include "NativeBcryptCppTurboModule.h"
#include <thread>

namespace facebook::react
{
NativeBcryptCppTurboModule::NativeBcryptCppTurboModule(std::shared_ptr<CallInvoker> jsinvoker) : NativeBcryptCppCxxSpec<NativeBcryptCppTurboModule>(std::move(jsinvoker)) {}

jsi::Value NativeBcryptCppTurboModule::generateHash(jsi::Runtime &rt, std::string password, double workload)
{
    jsi::Function promiseConstructor = rt.global().getPropertyAsFunction(rt, "Promise");
    
    return promiseConstructor.callAsConstructor(rt,
                                                jsi::Function::createFromHostFunction(
                                                                                      rt,
                                                                                      jsi::PropNameID::forAscii(rt, "promiseArg"),
                                                                                      2,
                                                                                      [password, workload, jsInvoker = jsInvoker_](
                                                                                                                                   jsi::Runtime &runtime,
                                                                                                                                   const jsi::Value &thisValue,
                                                                                                                                   const jsi::Value *arguments,
                                                                                                                                   std::size_t count) -> jsi::Value
                                                                                      {
                                                                                          auto resolverValue = std::make_shared<jsi::Value>((arguments[0].asObject(runtime)));
                                                                                          
                                                                                          std::thread([password, workload, resolverValue = std::move(resolverValue), jsInvoker, &runtime]()
                                                                                                      {
                                                                                              std::string hash = bcrypt::generateHash(password, workload);
                                                                                              // Post back to JS thread
                                                                                              jsInvoker->invokeAsync([resolverValue, hash, &runtime]() {
                                                                                                  resolverValue->asObject(runtime).asFunction(runtime).call(runtime, hash);
                                                                                              }); })
                                                                                          .detach();
                                                                                          return jsi::Value::undefined();
                                                                                      })
                                                
                                                );
}

jsi::Value NativeBcryptCppTurboModule::validatePassword(jsi::Runtime &rt, std::string password, std::string hash)
{
    jsi::Function promiseConstructor = rt.global().getPropertyAsFunction(rt, "Promise");
    
    return promiseConstructor.callAsConstructor(rt,
                                                jsi::Function::createFromHostFunction(
                                                                                      rt,
                                                                                      jsi::PropNameID::forAscii(rt, "promiseArg"),
                                                                                      2,
                                                                                      [password, hash, jsInvoker = jsInvoker_](
                                                                                                                               jsi::Runtime &runtime,
                                                                                                                               const jsi::Value &thisValue,
                                                                                                                               const jsi::Value *arguments,
                                                                                                                               std::size_t count) -> jsi::Value
                                                                                      {
                                                                                          auto resolverValue = std::make_shared<jsi::Value>((arguments[0].asObject(runtime)));
                                                                                          
                                                                                          std::thread([password, hash, resolverValue = std::move(resolverValue), jsInvoker, &runtime]()
                                                                                                      {
                                                                                              bool isValid = bcrypt::validatePassword(password, hash);
                                                                                              // Post back to JS thread
                                                                                              jsInvoker->invokeAsync([resolverValue, isValid, &runtime]() {
                                                                                                  resolverValue->asObject(runtime).asFunction(runtime).call(runtime, isValid);
                                                                                              }); })
                                                                                          .detach();
                                                                                          return jsi::Value::undefined();
                                                                                      })
                                                
                                                );
}
std::string NativeBcryptCppTurboModule::generateHashSync(jsi::Runtime &rt, std::string password, double workload)
{
    return bcrypt::generateHash(password, workload);
}
bool NativeBcryptCppTurboModule::validatePasswordSync(jsi::Runtime &rt, std::string password, std::string hash)
{
    return bcrypt::validatePassword(password, hash);
}

}
