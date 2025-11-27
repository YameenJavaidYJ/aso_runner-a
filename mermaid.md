erDiagram
    %% Core User Management
    users ||--o{ user_roles : has
    users ||--o{ addresses : has
    users ||--o{ payment_methods : has
    users ||--o{ user_sessions : has
    users ||--o{ notification_preferences : has
    users ||--o{ audit_logs : "created_by"
    users ||--o{ support_tickets : "created_by"
    
    user_roles ||--o{ role_permissions : has
    role_permissions }o--|| permissions : "references"
    
    %% Vendor Management
    users ||--o| vendors : "can_be"
    vendors ||--o{ vendor_documents : has
    vendors ||--o{ vendor_verification_history : has
    vendors ||--o{ vendor_operating_hours : has
    vendors ||--o{ vendor_service_areas : has
    vendors ||--o{ products : owns
    vendors ||--o{ orders : receives
    vendors ||--o{ vendor_payouts : receives
    vendors ||--o{ vendor_earnings : generates
    
    vendor_documents }o--|| document_types : "references"
    vendor_verification_history }o--|| users : "reviewed_by"
    
    %% Product Catalog
    products }o--|| product_categories : "belongs_to"
    products ||--o{ product_images : has
    products ||--o{ product_offers : "has_offers"
    products ||--o{ order_items : "ordered_as"
    products ||--o{ cart_items : "in_cart"
    
    product_categories }o--|| categories : "references"
    
    %% Rider Management
    users ||--o| riders : "can_be"
    riders ||--o{ rider_documents : has
    riders ||--o{ rider_verification_history : has
    riders ||--o| vehicles : has
    riders ||--o{ rider_service_zones : "serves"
    riders ||--o{ rider_availability : "tracks"
    riders ||--o{ delivery_assignments : "assigned_to"
    riders ||--o{ rider_payouts : receives
    riders ||--o{ rider_earnings : generates
    riders ||--o{ rider_locations : "tracks"
    
    rider_documents }o--|| document_types : "references"
    rider_verification_history }o--|| users : "reviewed_by"
    vehicles }o--|| vehicle_types : "references"
    rider_service_zones }o--|| delivery_zones : "references"
    
    %% Orders & Cart
    users ||--o{ orders : places
    users ||--o{ carts : has
    carts ||--o{ cart_items : contains
    orders ||--o{ order_items : contains
    orders ||--o{ order_status_timeline : tracks
    orders ||--o{ order_communications : has
    orders }o--|| addresses : "delivered_to"
    orders }o--|| payment_methods : "paid_with"
    orders }o--o| promotions : "uses"
    orders }o--o| delivery_assignments : "has"
    orders }o--o| disputes : "may_have"
    
    order_items }o--|| products : "references"
    order_status_timeline }o--|| order_statuses : "references"
    
    %% Delivery Management
    delivery_assignments }o--|| riders : "assigned_to"
    delivery_assignments ||--o{ delivery_status_updates : tracks
    delivery_assignments }o--o| delivery_batches : "may_be_in"
    delivery_batches ||--o{ delivery_assignments : contains
    
    %% Payments & Payouts
    orders ||--o{ payments : generates
    payments }o--|| payment_methods : "uses"
    payments }o--|| payment_providers : "via"
    payments ||--o{ payment_transactions : tracks
    
    vendor_payouts }o--|| vendors : "for"
    vendor_payouts }o--|| payout_methods : "via"
    vendor_payouts }o--|| payout_schedules : "scheduled_by"
    vendor_payouts ||--o{ vendor_earnings : "includes"
    
    rider_payouts }o--|| riders : "for"
    rider_payouts }o--|| payout_methods : "via"
    rider_payouts }o--|| payout_schedules : "scheduled_by"
    rider_payouts ||--o{ rider_earnings : "includes"
    
    payout_schedules }o--|| users : "configured_by"
    
    %% Promotions
    promotions ||--o{ promotion_eligibility_rules : has
    promotions ||--o{ promotion_redemptions : "redeemed"
    promotion_redemptions }o--|| orders : "applied_to"
    promotions }o--o| vendors : "may_be_vendor_specific"
    
    %% Support & Disputes
    support_tickets ||--o{ ticket_messages : contains
    support_tickets }o--|| users : "created_by"
    support_tickets }o--o| orders : "related_to"
    support_tickets ||--o{ ticket_attachments : has
    
    disputes }o--|| orders : "related_to"
    disputes ||--o{ dispute_resolutions : has
    disputes }o--|| users : "created_by"
    disputes }o--o| users : "resolved_by"
    
    phone_call_logs }o--|| users : "with"
    phone_call_logs }o--o| support_tickets : "related_to"
    
    %% Notifications
    notifications }o--|| users : "sent_to"
    notifications }o--|| notification_templates : "uses"
    notification_templates }o--|| notification_types : "references"
    
    %% Platform Configuration
    delivery_zones ||--o{ delivery_pricing : has
    delivery_zones ||--o{ vendor_service_areas : "covers"
    delivery_zones ||--o{ rider_service_zones : "covers"
    
    commission_settings }o--|| users : "configured_by"
    platform_configurations }o--|| users : "configured_by"
    
    categories ||--o{ product_categories : "contains"
    
    %% Audit & Activity
    audit_logs }o--|| users : "created_by"
    user_activity_logs }o--|| users : "tracks"

    %% Entity Definitions
    %% Core User Management
    users ||--o{ user_roles : has
    users ||--o{ addresses : has
    users ||--o{ payment_methods : has
    users ||--o{ user_sessions : has
    users ||--o{ notification_preferences : has
    users ||--o{ audit_logs : "created_by"
    users ||--o{ support_tickets : "created_by"
    
    user_roles ||--o{ role_permissions : has
    role_permissions }o--|| permissions : "references"
    
    %% Vendor Management
    users ||--o| vendors : "can_be"
    vendors ||--o{ vendor_documents : has
    vendors ||--o{ vendor_verification_history : has
    vendors ||--o{ vendor_operating_hours : has
    vendors ||--o{ vendor_service_areas : has
    vendors ||--o{ products : owns
    vendors ||--o{ orders : receives
    vendors ||--o{ vendor_payouts : receives
    vendors ||--o{ vendor_earnings : generates
    
    vendor_documents }o--|| document_types : "references"
    vendor_verification_history }o--|| users : "reviewed_by"
    
    %% Product Catalog
    products }o--|| product_categories : "belongs_to"
    products ||--o{ product_images : has
    products ||--o{ product_offers : "has_offers"
    products ||--o{ order_items : "ordered_as"
    products ||--o{ cart_items : "in_cart"
    
    product_categories }o--|| categories : "references"
    
    %% Rider Management
    users ||--o| riders : "can_be"
    riders ||--o{ rider_documents : has
    riders ||--o{ rider_verification_history : has
    riders ||--o| vehicles : has
    riders ||--o{ rider_service_zones : "serves"
    riders ||--o{ rider_availability : "tracks"
    riders ||--o{ delivery_assignments : "assigned_to"
    riders ||--o{ rider_payouts : receives
    riders ||--o{ rider_earnings : generates
    riders ||--o{ rider_locations : "tracks"
    
    rider_documents }o--|| document_types : "references"
    rider_verification_history }o--|| users : "reviewed_by"
    vehicles }o--|| vehicle_types : "references"
    rider_service_zones }o--|| delivery_zones : "references"
    
    %% Orders & Cart
    users ||--o{ orders : places
    users ||--o{ carts : has
    carts ||--o{ cart_items : contains
    orders ||--o{ order_items : contains
    orders ||--o{ order_status_timeline : tracks
    orders ||--o{ order_communications : has
    orders }o--|| addresses : "delivered_to"
    orders }o--|| payment_methods : "paid_with"
    orders }o--o| promotions : "uses"
    orders }o--o| delivery_assignments : "has"
    orders }o--o| disputes : "may_have"
    
    order_items }o--|| products : "references"
    order_status_timeline }o--|| order_statuses : "references"
    
    %% Delivery Management
    delivery_assignments }o--|| riders : "assigned_to"
    delivery_assignments ||--o{ delivery_status_updates : tracks
    delivery_assignments }o--o| delivery_batches : "may_be_in"
    delivery_batches ||--o{ delivery_assignments : contains
    
    %% Payments & Payouts
    orders ||--o{ payments : generates
    payments }o--|| payment_methods : "uses"
    payments }o--|| payment_providers : "via"
    payments ||--o{ payment_transactions : tracks
    
    vendor_payouts }o--|| vendors : "for"
    vendor_payouts }o--|| payout_methods : "via"
    vendor_payouts }o--|| payout_schedules : "scheduled_by"
    vendor_payouts ||--o{ vendor_earnings : "includes"
    
    rider_payouts }o--|| riders : "for"
    rider_payouts }o--|| payout_methods : "via"
    rider_payouts }o--|| payout_schedules : "scheduled_by"
    rider_payouts ||--o{ rider_earnings : "includes"
    
    payout_schedules }o--|| users : "configured_by"
    
    %% Promotions
    promotions ||--o{ promotion_eligibility_rules : has
    promotions ||--o{ promotion_redemptions : "redeemed"
    promotion_redemptions }o--|| orders : "applied_to"
    promotions }o--o| vendors : "may_be_vendor_specific"
    
    %% Support & Disputes
    support_tickets ||--o{ ticket_messages : contains
    support_tickets }o--|| users : "created_by"
    support_tickets }o--o| orders : "related_to"
    support_tickets ||--o{ ticket_attachments : has
    
    disputes }o--|| orders : "related_to"
    disputes ||--o{ dispute_resolutions : has
    disputes }o--|| users : "created_by"
    disputes }o--o| users : "resolved_by"
    
    phone_call_logs }o--|| users : "with"
    phone_call_logs }o--o| support_tickets : "related_to"
    
    %% Notifications
    notifications }o--|| users : "sent_to"
    notifications }o--|| notification_templates : "uses"
    notification_templates }o--|| notification_types : "references"
    
    %% Platform Configuration
    delivery_zones ||--o{ delivery_pricing : has
    delivery_zones ||--o{ vendor_service_areas : "covers"
    delivery_zones ||--o{ rider_service_zones : "covers"
    
    commission_settings }o--|| users : "configured_by"
    platform_configurations }o--|| users : "configured_by"
    
    categories ||--o{ product_categories : "contains"
    
    %% Audit & Activity
    audit_logs }o--|| users : "created_by"
    user_activity_logs }o--|| users : "tracks"

    %% Entity Definitions
    
    users {
        uuid id PK
        string email UK
        string phone UK
        string password_hash
        string full_name
        string role "customer|vendor|rider|admin|support_admin|finance_admin"
        string status "active|suspended|pending_verification|deleted"
        string language "fr|en"
        string currency "XAF"
        timestamp email_verified_at
        timestamp phone_verified_at
        timestamp last_login_at
        jsonb profile_picture
        timestamp created_at
        timestamp updated_at
    }
    
    user_roles {
        uuid id PK
        uuid user_id FK
        string role_name
        timestamp assigned_at
        uuid assigned_by FK
    }
    
    role_permissions {
        uuid id PK
        uuid role_id FK
        uuid permission_id FK
    }
    
    permissions {
        uuid id PK
        string permission_name UK
        string module
        string description
    }
    
    addresses {
        uuid id PK
        uuid user_id FK
        string nickname
        string recipient_name
        string recipient_phone
        string street_address
        string city
        string region
        decimal latitude
        decimal longitude
        string delivery_notes
        boolean is_default
        timestamp created_at
        timestamp updated_at
    }
    
    payment_methods {
        uuid id PK
        uuid user_id FK
        string type "mtn_momo|orange_money|card"
        string provider_token
        string last_four
        string account_name
        string account_number
        boolean is_default
        jsonb metadata
        timestamp created_at
        timestamp updated_at
    }
    
    user_sessions {
        uuid id PK
        uuid user_id FK
        string device_id
        string ip_address
        string user_agent
        timestamp expires_at
        timestamp created_at
    }
    
    vendors {
        uuid id PK
        uuid user_id FK
        string business_name
        string owner_name
        string description
        jsonb logo_url
        jsonb cover_image_url
        jsonb gallery_images
        string market_location
        decimal latitude
        decimal longitude
        string phone
        string whatsapp
        string email
        string verification_status "pending|approved|rejected|suspended"
        decimal rating
        integer total_ratings
        integer response_time_avg
        decimal cancellation_rate
        boolean is_online
        integer max_concurrent_orders
        integer prep_time_default
        timestamp verified_at
        uuid verified_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    vendor_documents {
        uuid id PK
        uuid vendor_id FK
        uuid document_type_id FK
        string document_url
        string status "pending|approved|rejected"
        text admin_notes
        timestamp uploaded_at
        timestamp reviewed_at
        uuid reviewed_by FK
    }
    
    document_types {
        uuid id PK
        string name UK
        string category "vendor|rider"
        boolean is_required
    }
    
    vendor_verification_history {
        uuid id PK
        uuid vendor_id FK
        string action "submitted|approved|rejected|requested_info"
        text notes
        uuid reviewed_by FK
        timestamp created_at
    }
    
    vendor_operating_hours {
        uuid id PK
        uuid vendor_id FK
        integer day_of_week "0-6"
        time open_time
        time close_time
        boolean is_closed
        timestamp created_at
        timestamp updated_at
    }
    
    vendor_service_areas {
        uuid id PK
        uuid vendor_id FK
        uuid delivery_zone_id FK
        timestamp created_at
    }
    
    products {
        uuid id PK
        uuid vendor_id FK
        uuid category_id FK
        string name
        text description
        decimal price
        string unit "kg|bunch|piece|liter"
        integer stock_quantity
        boolean is_available
        boolean is_visible
        text preparation_notes
        text nutritional_info
        string origin
        decimal rating
        integer total_ratings
        timestamp created_at
        timestamp updated_at
    }
    
    product_categories {
        uuid id PK
        uuid product_id FK
        uuid category_id FK
    }
    
    categories {
        uuid id PK
        string name UK
        string name_fr
        string name_en
        string slug UK
        jsonb icon_url
        integer display_order
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    product_images {
        uuid id PK
        uuid product_id FK
        string image_url
        integer display_order
        timestamp created_at
    }
    
    product_offers {
        uuid id PK
        uuid product_id FK
        uuid customer_id FK
        decimal offered_price
        string status "pending|accepted|rejected|counter_offered"
        decimal counter_offer_price
        text vendor_notes
        timestamp expires_at
        timestamp created_at
        timestamp updated_at
    }
    
    riders {
        uuid id PK
        uuid user_id FK
        string full_name
        date date_of_birth
        string emergency_contact_name
        string emergency_contact_phone
        string verification_status "pending|approved|rejected|suspended"
        decimal rating
        integer total_ratings
        integer total_deliveries
        decimal acceptance_rate
        decimal on_time_rate
        decimal cancellation_rate
        boolean is_online
        timestamp last_online_at
        decimal current_latitude
        decimal current_longitude
        timestamp verified_at
        uuid verified_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    rider_documents {
        uuid id PK
        uuid rider_id FK
        uuid document_type_id FK
        string document_url
        string status "pending|approved|rejected"
        date expiry_date
        text admin_notes
        timestamp uploaded_at
        timestamp reviewed_at
        uuid reviewed_by FK
    }
    
    rider_verification_history {
        uuid id PK
        uuid rider_id FK
        string action "submitted|approved|rejected|requested_info"
        text notes
        uuid reviewed_by FK
        timestamp created_at
    }
    
    vehicles {
        uuid id PK
        uuid rider_id FK
        uuid vehicle_type_id FK
        string plate_number UK
        string color
        date insurance_expiry
        string registration_number
        timestamp created_at
        timestamp updated_at
    }
    
    vehicle_types {
        uuid id PK
        string name UK
        string description
    }
    
    rider_service_zones {
        uuid id PK
        uuid rider_id FK
        uuid delivery_zone_id FK
        boolean is_preferred
        timestamp created_at
    }
    
    rider_availability {
        uuid id PK
        uuid rider_id FK
        boolean is_available
        decimal latitude
        decimal longitude
        timestamp last_updated_at
    }
    
    rider_locations {
        uuid id PK
        uuid rider_id FK
        decimal latitude
        decimal longitude
        timestamp recorded_at
    }
    
    carts {
        uuid id PK
        uuid user_id FK
        uuid vendor_id FK
        timestamp created_at
        timestamp updated_at
        timestamp expires_at
    }
    
    cart_items {
        uuid id PK
        uuid cart_id FK
        uuid product_id FK
        integer quantity
        decimal price_snapshot
        text notes
        timestamp created_at
        timestamp updated_at
    }
    
    orders {
        uuid id PK
        string order_number UK
        uuid customer_id FK
        uuid vendor_id FK
        uuid delivery_address_id FK
        uuid payment_method_id FK
        uuid promo_id FK
        decimal subtotal
        decimal delivery_fee
        decimal commission_amount
        decimal promo_discount
        decimal tax_amount
        decimal total_amount
        string status "received|vendor_accepted|preparing|ready_for_pickup|rider_assigned|picked_up|out_for_delivery|delivered|cancelled"
        string delivery_method "bike|car"
        integer estimated_prep_time
        timestamp promised_pickup_time
        timestamp promised_delivery_time
        timestamp accepted_at
        timestamp prepared_at
        timestamp ready_at
        timestamp picked_up_at
        timestamp delivered_at
        text delivery_notes
        text cancellation_reason
        uuid cancelled_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    order_items {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        string product_name_snapshot
        integer quantity
        decimal unit_price
        decimal total_price
        text notes
        timestamp created_at
    }
    
    order_status_timeline {
        uuid id PK
        uuid order_id FK
        uuid status_id FK
        uuid actor_id FK
        string actor_type "customer|vendor|rider|admin|system"
        text notes
        timestamp created_at
    }
    
    order_statuses {
        uuid id PK
        string status_code UK
        string status_name
        integer display_order
    }
    
    order_communications {
        uuid id PK
        uuid order_id FK
        uuid from_user_id FK
        uuid to_user_id FK
        string channel "in_app|whatsapp|phone|email"
        text message
        string message_type "text|image|location"
        boolean is_read
        timestamp created_at
    }
    
    delivery_assignments {
        uuid id PK
        uuid order_id FK
        uuid rider_id FK
        uuid batch_id FK
        string status "assigned|accepted|arrived_at_vendor|picked_up|out_for_delivery|delivered|cancelled"
        decimal pickup_latitude
        decimal pickup_longitude
        decimal delivery_latitude
        decimal delivery_longitude
        decimal distance_km
        integer estimated_minutes
        timestamp assigned_at
        timestamp accepted_at
        timestamp arrived_at_vendor_at
        timestamp picked_up_at
        timestamp out_for_delivery_at
        timestamp delivered_at
        text delivery_notes
        jsonb proof_of_delivery
        timestamp created_at
        timestamp updated_at
    }
    
    delivery_batches {
        uuid id PK
        uuid rider_id FK
        string status "active|completed|cancelled"
        integer total_stops
        decimal total_distance_km
        timestamp started_at
        timestamp completed_at
        timestamp created_at
    }
    
    delivery_status_updates {
        uuid id PK
        uuid delivery_assignment_id FK
        string status
        decimal latitude
        decimal longitude
        text notes
        timestamp created_at
    }
    
    payments {
        uuid id PK
        uuid order_id FK
        uuid payment_method_id FK
        uuid provider_id FK
        string transaction_id UK
        decimal amount
        string currency "XAF"
        string status "pending|processing|completed|failed|refunded"
        string payment_type "order_payment|refund|payout"
        jsonb provider_response
        integer retry_count
        text failure_reason
        timestamp processed_at
        timestamp created_at
        timestamp updated_at
    }
    
    payment_providers {
        uuid id PK
        string name UK "mtn_momo|orange_money|stripe"
        string api_key_encrypted
        string api_secret_encrypted
        jsonb webhook_config
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    payment_transactions {
        uuid id PK
        uuid payment_id FK
        string transaction_type "charge|refund|payout"
        decimal amount
        string status
        jsonb provider_response
        timestamp created_at
    }
    
    vendor_earnings {
        uuid id PK
        uuid vendor_id FK
        uuid order_id FK
        decimal order_total
        decimal commission_rate
        decimal commission_amount
        decimal net_earnings
        string payout_status "pending|available|on_hold|paid"
        uuid payout_id FK
        timestamp earned_at
        timestamp created_at
    }
    
    vendor_payouts {
        uuid id PK
        uuid vendor_id FK
        uuid payout_method_id FK
        uuid schedule_id FK
        decimal amount
        decimal fees
        decimal net_amount
        string status "pending|processing|completed|failed|cancelled"
        string payout_reference
        jsonb provider_response
        text failure_reason
        timestamp requested_at
        timestamp processed_at
        timestamp created_at
        timestamp updated_at
    }
    
    rider_earnings {
        uuid id PK
        uuid rider_id FK
        uuid delivery_assignment_id FK
        decimal base_fee
        decimal distance_fee
        decimal surge_multiplier
        decimal bonus
        decimal tip
        decimal total_earnings
        string payout_status "pending|available|on_hold|paid"
        uuid payout_id FK
        timestamp earned_at
        timestamp created_at
    }
    
    rider_payouts {
        uuid id PK
        uuid rider_id FK
        uuid payout_method_id FK
        uuid schedule_id FK
        decimal amount
        decimal fees
        decimal net_amount
        string status "pending|processing|completed|failed|cancelled"
        string payout_reference
        jsonb provider_response
        text failure_reason
        timestamp requested_at
        timestamp processed_at
        timestamp created_at
        timestamp updated_at
    }
    
    payout_methods {
        uuid id PK
        string type "mtn_momo|orange_money|bank_transfer"
        string account_name
        string account_number
        jsonb verification_data
        boolean is_verified
        timestamp created_at
        timestamp updated_at
    }
    
    payout_schedules {
        uuid id PK
        string schedule_type "vendor|rider"
        integer day_of_week "0-6"
        time scheduled_time
        decimal minimum_threshold
        boolean is_active
        uuid configured_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    promotions {
        uuid id PK
        string promo_code UK
        string name
        string type "percentage|fixed_amount|free_delivery"
        decimal value
        uuid vendor_id FK
        decimal minimum_order_value
        integer max_uses
        integer used_count
        integer max_uses_per_user
        date valid_from
        date valid_to
        boolean is_active
        jsonb eligibility_rules
        timestamp created_at
        timestamp updated_at
    }
    
    promotion_eligibility_rules {
        uuid id PK
        uuid promo_id FK
        string rule_type "new_users_only|geography|category|minimum_order"
        jsonb rule_value
        timestamp created_at
    }
    
    promotion_redemptions {
        uuid id PK
        uuid promo_id FK
        uuid order_id FK
        uuid user_id FK
        decimal discount_amount
        timestamp redeemed_at
    }
    
    support_tickets {
        uuid id PK
        string ticket_number UK
        uuid created_by FK
        uuid assigned_to FK
        uuid order_id FK
        string category "ordering|delivery|payment|account|technical"
        string priority "low|medium|high|urgent"
        string status "new|in_review|awaiting_customer|awaiting_vendor|resolved|closed"
        string subject
        text description
        timestamp resolved_at
        uuid resolved_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    ticket_messages {
        uuid id PK
        uuid ticket_id FK
        uuid user_id FK
        text message
        boolean is_internal
        timestamp created_at
    }
    
    ticket_attachments {
        uuid id PK
        uuid ticket_id FK
        string file_url
        string file_type
        timestamp created_at
    }
    
    disputes {
        uuid id PK
        uuid order_id FK
        uuid created_by FK
        uuid resolved_by FK
        string dispute_type "delivery_issue|product_quality|payment|other"
        string status "new|in_review|awaiting_customer|awaiting_vendor|resolved|escalated"
        text description
        jsonb attachments
        decimal refund_amount
        jsonb penalties_applied
        timestamp sla_deadline
        timestamp resolved_at
        timestamp created_at
        timestamp updated_at
    }
    
    dispute_resolutions {
        uuid id PK
        uuid dispute_id FK
        uuid resolved_by FK
        string resolution_type "refund|replacement|penalty|dismissed"
        text resolution_notes
        decimal refund_amount
        timestamp created_at
    }
    
    phone_call_logs {
        uuid id PK
        uuid user_id FK
        uuid ticket_id FK
        string phone_number
        string call_direction "inbound|outbound"
        integer duration_seconds
        text notes
        timestamp called_at
        timestamp created_at
    }
    
    notifications {
        uuid id PK
        uuid user_id FK
        uuid template_id FK
        string channel "push|sms|email|in_app"
        string type "order_status|delivery_alert|promotion|system_update|payout"
        string title
        text content
        jsonb data
        boolean is_read
        timestamp read_at
        string delivery_status "pending|sent|delivered|failed"
        timestamp sent_at
        timestamp created_at
    }
    
    notification_preferences {
        uuid id PK
        uuid user_id FK
        string notification_type
        boolean push_enabled
        boolean sms_enabled
        boolean email_enabled
        timestamp created_at
        timestamp updated_at
    }
    
    notification_templates {
        uuid id PK
        uuid type_id FK
        string name
        string language "fr|en"
        string channel "push|sms|email"
        string subject
        text content
        jsonb variables
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    notification_types {
        uuid id PK
        string type_code UK
        string type_name
        string description
    }
    
    delivery_zones {
        uuid id PK
        string name UK
        string city
        jsonb boundary_coordinates
        decimal base_delivery_fee
        integer default_eta_minutes
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }
    
    delivery_pricing {
        uuid id PK
        uuid delivery_zone_id FK
        string delivery_method "bike|car"
        decimal base_fee
        decimal per_km_fee
        decimal free_delivery_threshold
        timestamp created_at
        timestamp updated_at
    }
    
    commission_settings {
        uuid id PK
        string entity_type "vendor|rider"
        decimal commission_rate
        jsonb tier_rules
        uuid configured_by FK
        timestamp effective_from
        timestamp effective_to
        timestamp created_at
        timestamp updated_at
    }
    
    platform_configurations {
        uuid id PK
        string config_key UK
        string config_value
        jsonb metadata
        uuid configured_by FK
        string version
        timestamp created_at
        timestamp updated_at
    }
    
    audit_logs {
        uuid id PK
        uuid user_id FK
        string action
        string entity_type
        uuid entity_id
        jsonb old_values
        jsonb new_values
        string ip_address
        string user_agent
        timestamp created_at
    }
    
    user_activity_logs {
        uuid id PK
        uuid user_id FK
        string activity_type
        string module
        jsonb activity_data
        string ip_address
        timestamp created_at
    }
