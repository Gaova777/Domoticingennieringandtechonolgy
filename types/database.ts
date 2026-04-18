export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      brands: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string | null
          product_snapshot: Json
          quantity: number
          subtotal: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id?: string | null
          product_snapshot: Json
          quantity: number
          subtotal: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string | null
          product_snapshot?: Json
          quantity?: number
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          guest_email: string | null
          guest_phone: string | null
          id: string
          notes: string | null
          order_number: string
          payment_method: string | null
          payment_ref: string | null
          shipping: number
          shipping_address: Json | null
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          guest_email?: string | null
          guest_phone?: string | null
          id?: string
          notes?: string | null
          order_number: string
          payment_method?: string | null
          payment_ref?: string | null
          shipping?: number
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal: number
          total: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          guest_email?: string | null
          guest_phone?: string | null
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          payment_ref?: string | null
          shipping?: number
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          total?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          badges: string[]
          brand_id: string
          category_id: string
          compare_at_price: number | null
          created_at: string
          description: string | null
          gallery_urls: string[]
          id: string
          image_url: string | null
          includes: string[]
          is_active: boolean
          is_featured: boolean
          is_star: boolean
          name: string
          price: number
          protocol: string | null
          rating: number
          reviews: number
          short_spec: string | null
          sku: string
          slug: string
          specs: Json
          stock: number
          updated_at: string
          warranty_months: number
        }
        Insert: {
          badges?: string[]
          brand_id: string
          category_id: string
          compare_at_price?: number | null
          created_at?: string
          description?: string | null
          gallery_urls?: string[]
          id?: string
          image_url?: string | null
          includes?: string[]
          is_active?: boolean
          is_featured?: boolean
          is_star?: boolean
          name: string
          price: number
          protocol?: string | null
          rating?: number
          reviews?: number
          short_spec?: string | null
          sku: string
          slug: string
          specs?: Json
          stock?: number
          updated_at?: string
          warranty_months?: number
        }
        Update: {
          badges?: string[]
          brand_id?: string
          category_id?: string
          compare_at_price?: number | null
          created_at?: string
          description?: string | null
          gallery_urls?: string[]
          id?: string
          image_url?: string | null
          includes?: string[]
          is_active?: boolean
          is_featured?: boolean
          is_star?: boolean
          name?: string
          price?: number
          protocol?: string | null
          rating?: number
          reviews?: number
          short_spec?: string | null
          sku?: string
          slug?: string
          specs?: Json
          stock?: number
          updated_at?: string
          warranty_months?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          max_uses: number | null
          min_purchase: number
          type: Database["public"]["Enums"]["promotion_type"]
          updated_at: string
          used_count: number
          valid_from: string
          valid_to: string | null
          value: number
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          min_purchase?: number
          type: Database["public"]["Enums"]["promotion_type"]
          updated_at?: string
          used_count?: number
          valid_from?: string
          valid_to?: string | null
          value: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          max_uses?: number | null
          min_purchase?: number
          type?: Database["public"]["Enums"]["promotion_type"]
          updated_at?: string
          used_count?: number
          valid_from?: string
          valid_to?: string | null
          value?: number
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          admin_response: string | null
          city: string
          created_at: string
          description: string
          email: string | null
          file_url: string | null
          id: string
          name: string
          pdf_url: string | null
          phone: string
          service_id: string | null
          status: Database["public"]["Enums"]["quote_status"]
          tentative_date: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_response?: string | null
          city: string
          created_at?: string
          description: string
          email?: string | null
          file_url?: string | null
          id?: string
          name: string
          pdf_url?: string | null
          phone: string
          service_id?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          tentative_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_response?: string | null
          city?: string
          created_at?: string
          description?: string
          email?: string | null
          file_url?: string | null
          id?: string
          name?: string
          pdf_url?: string | null
          phone?: string
          service_id?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          tentative_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_requests_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          accent: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          long_description: string | null
          name: string
          slug: string
          sort_order: number
          tagline: string | null
        }
        Insert: {
          accent?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          long_description?: string | null
          name: string
          slug: string
          sort_order?: number
          tagline?: string | null
        }
        Update: {
          accent?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          long_description?: string | null
          name?: string
          slug?: string
          sort_order?: number
          tagline?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          city: string | null
          created_at: string
          id: string
          is_active: boolean
          message: string
          name: string
          rating: number | null
          role: string | null
          service: string | null
          sort_order: number
        }
        Insert: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          message: string
          name: string
          rating?: number | null
          role?: string | null
          service?: string | null
          sort_order?: number
        }
        Update: {
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          message?: string
          name?: string
          rating?: number | null
          role?: string | null
          service?: string | null
          sort_order?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_stock: {
        Args: { amount: number; product_id: string }
        Returns: undefined
      }
      increment_promo_usage: { Args: { promo_id: string }; Returns: undefined }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      order_status:
        | "pending"
        | "paid"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "refunded"
      promotion_type: "percent" | "fixed_cop"
      quote_status:
        | "pending"
        | "contacted"
        | "quoted"
        | "approved"
        | "in_progress"
        | "completed"
        | "cancelled"
      user_role: "customer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      promotion_type: ["percent", "fixed_cop"],
      quote_status: [
        "pending",
        "contacted",
        "quoted",
        "approved",
        "in_progress",
        "completed",
        "cancelled",
      ],
      user_role: ["customer", "admin"],
    },
  },
} as const
