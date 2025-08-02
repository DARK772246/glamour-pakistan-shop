--- a/components/Header.tsx
+++ b/components/Header.tsx
@@ -40,13 +40,6 @@
                   {item.name}
                 </Link>
               ))}
-              {/* Admin Panel Button - Prominent Yellow Button */}
-              <Link
-                href="/admin"
-                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg"
-              >
-                🔧 Admin Panel
-              </Link>
             </nav>
 
             {/* Actions */}
@@ -126,14 +119,6 @@
                     {item.name}
                   </Link>
                 ))}
-                {/* Mobile Admin Panel Button */}
-                <Link
-                  href="/admin"
-                  onClick={() => setIsMenuOpen(false)}
-                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition-colors text-center mx-2"
-                >
-                  🔧 Admin Panel
-                </Link>
 
                 {/* Mobile User Menu */}
                 <div className="border-t border-white/10 pt-4 px-2">